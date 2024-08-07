import { Test } from "@nestjs/testing";
import { events, flows, flowUserProgresses } from "db";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { LemonSqueezyService } from "../lemon-squeezy/lemon-squeezy.service";
import type { MockDB, MockDbPermissionService } from "../mocks";
import { getMockDB, getMockDbPermissionService } from "../mocks";
import { getMockLemonSqueezyService, type MockLemonSqueezyService } from "../mocks/lemon-squeezy";
import {
  getMockOrganizationUsageService,
  type MockOrganizationUsageService,
} from "../mocks/organization-usage";
import { OrganizationUsageService } from "../organization-usage/organization-usage.service";
import { SdkController } from "./sdk.controller";
import type { CreateEventDto } from "./sdk.dto";
import { SdkService } from "./sdk.service";

let sdkController: SdkController;
let dbPermissionService: MockDbPermissionService;
let db: MockDB;
let organizationUsageService: MockOrganizationUsageService;
let lemonSqueezyService: MockLemonSqueezyService;

beforeEach(async () => {
  db = getMockDB();
  dbPermissionService = getMockDbPermissionService();
  organizationUsageService = getMockOrganizationUsageService();
  lemonSqueezyService = getMockLemonSqueezyService();

  const moduleRef = await Test.createTestingModule({
    controllers: [SdkController],
    providers: [SdkService],
  })

    .useMocker((token) => {
      if (token === DatabaseService) return { db };
      if (token === DbPermissionService) return dbPermissionService;
      if (token === OrganizationUsageService) return organizationUsageService;
      if (token === LemonSqueezyService) return lemonSqueezyService;
    })
    .compile();

  sdkController = moduleRef.get(SdkController);
});

describe("Get css", () => {
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue({
      css_vars: "body { color: red; }",
      css_template: "body { color: blue; }",
    });
  });
  it("should throw without projectId", async () => {
    await expect(sdkController.getCss("", "latest")).rejects.toThrow("Not Found");
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.getCss("projectId", "latest")).rejects.toThrow("Not Found");
  });
  it("should return css", async () => {
    await expect(sdkController.getCss("projectId", "latest")).resolves.toEqual("body{color:#00f}");
  });
});

describe("Get flows", () => {
  const mockFlows = [
    {
      id: "f1",
      human_id: "f1h",
      name: "F1",
      publishedVersion: {
        frequency: "once",
        data: { steps: [{}] },
      },
    },
    {
      id: "f2",
      human_id: "f2h",
      name: "F2",
      publishedVersion: {
        frequency: "every-session",
        data: { steps: [{}] },
      },
    },
    {
      id: "f3",
      human_id: "f3h",
      name: "F3",
      publishedVersion: {
        frequency: "every-time",
        data: { steps: [{}, {}] },
      },
    },
  ];
  beforeEach(() => {
    db.query.flows.findMany.mockReturnValue(mockFlows);
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(false);
  });
  it("should throw with not allowed origin", async () => {
    dbPermissionService.isAllowedOrigin.mockRejectedValue(new Error());
    await expect(sdkController.getFlows("https://example.com", "projId")).rejects.toThrow();
    await expect(sdkController.getFlowsV2("https://example.com", "projId")).rejects.toThrow();
  });
  it("should return no flows when limit is reached", async () => {
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(true);
    await expect(sdkController.getFlows("https://example.com", "projId")).rejects.toThrow(
      "Organization limit reached",
    );
    await expect(sdkController.getFlowsV2("https://example.com", "projId")).rejects.toThrow(
      "Organization limit reached",
    );
  });
  it("should not return flows without published version", async () => {
    db.query.flows.findMany.mockReturnValue(
      mockFlows.map((f) => ({ ...f, publishedVersion: null, draftVersion: f.publishedVersion })),
    );
    await expect(sdkController.getFlows("https://example.com", "projId")).resolves.toEqual([]);
    await expect(sdkController.getFlowsV2("https://example.com", "projId")).resolves.toEqual({
      results: [],
    });
  });
  it("should return flows", async () => {
    await expect(sdkController.getFlows("https://example.com", "projId")).resolves.toEqual([
      { id: "f1h", steps: [{}], frequency: "once" },
      { id: "f2h", steps: [{}], frequency: "every-session" },
      { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
    ]);
    await expect(sdkController.getFlowsV2("https://example.com", "projId")).resolves.toEqual({
      results: [
        { id: "f1h", steps: [{}], frequency: "once" },
        { id: "f2h", steps: [{}], frequency: "every-session" },
        { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
      ],
    });
  });
  it("should return error_message when limit is reached and origin is localhost", async () => {
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(true);
    // V1 doesn't return error_message
    await expect(sdkController.getFlows("http://localhost:3000", "projId")).resolves.toEqual([
      { id: "f1h", steps: [{}], frequency: "once" },
      { id: "f2h", steps: [{}], frequency: "every-session" },
      { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
    ]);
    await expect(sdkController.getFlowsV2("http://localhost:3000", "projId")).resolves.toEqual({
      error_message:
        "Organization limit reached, your flows will be loaded because you are on localhost.",
      results: [
        { id: "f1h", steps: [{}], frequency: "once" },
        { id: "f2h", steps: [{}], frequency: "every-session" },
        { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
      ],
    });
  });
  it("should not return flows if user already seen it", async () => {
    db.query.flowUserProgresses.findMany.mockResolvedValue([{ flow_id: "f1" }]);
    await expect(
      sdkController.getFlows("https://example.com", "projId", "userHash"),
    ).resolves.toEqual([
      { id: "f2h", steps: [{}], frequency: "every-session" },
      { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
    ]);
    await expect(
      sdkController.getFlowsV2("https://example.com", "projId", "userHash"),
    ).resolves.toEqual({
      results: [
        { id: "f2h", steps: [{}], frequency: "every-session" },
        { id: "f3h", steps: [{}], frequency: "every-time", _incompleteSteps: true },
      ],
    });
  });
});

describe("Create event", () => {
  const createEventDto: CreateEventDto = {
    eventTime: new Date(),
    flowId: "b",
    stepIndex: "c",
    userHash: "d",
    flowHash: "e",
    stepHash: "f",
    projectId: "882b69bd-d73e-454d-8042-44d0720c6ea4",
    sdkVersion: "0.0.0",
    location: "/",
    type: "startFlow",
  };
  const flow = {
    id: "fid",
    flow_type: "local",
  };
  beforeEach(() => {
    db.query.flows.findFirst.mockResolvedValue(flow);
    db.returning.mockResolvedValueOnce([{ id: "newEventId" }]);
    db.where.mockResolvedValue([{ subscription_item_id: "subItemId" }]);
    lemonSqueezyService.createUsageRecord.mockResolvedValue({});
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(false);
  });
  it("should throw with not allowed origin", async () => {
    dbPermissionService.isAllowedOrigin.mockRejectedValue(new Error());
    await expect(
      sdkController.createEvent("https://example.com", createEventDto),
    ).rejects.toThrow();
  });
  it("should throw with limit reached with local flow", async () => {
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(true);
    await expect(sdkController.createEvent("https://example.com", createEventDto)).rejects.toThrow(
      "Organization limit reached",
    );
  });
  it("should throw with limit reached without flow, which means its local flow", async () => {
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(true);
    db.query.flows.findFirst.mockResolvedValue(null);
    await expect(sdkController.createEvent("https://example.com", createEventDto)).rejects.toThrow(
      "Organization limit reached",
    );
  });
  it("should not throw with limit reached and cloud flow", async () => {
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(true);
    db.query.flows.findFirst.mockResolvedValue({ ...flow, flow_type: "cloud" });
    await expect(sdkController.createEvent("https://example.com", createEventDto)).resolves.toEqual(
      {
        id: "newEventId",
      },
    );
  });
  it("should throw with no created event", async () => {
    db.returning.mockReset();
    db.returning.mockResolvedValue([]);
    await expect(sdkController.createEvent("https://example.com", createEventDto)).rejects.toThrow(
      "error saving event",
    );
  });
  it("should not create progress record without userHash", async () => {
    await expect(
      sdkController.createEvent("https://example.com", {
        ...createEventDto,
        type: "finishFlow",
        userHash: undefined,
      }),
    ).resolves.toEqual({ id: "newEventId" });
    expect(db.insert).toHaveBeenCalledWith(events);
    expect(db.insert).not.toHaveBeenCalledWith(flowUserProgresses);
    expect(db.values).toHaveBeenCalledTimes(1);
  });
  it("should create local flow if it doesn't exist", async () => {
    db.returning.mockReset();
    db.returning.mockResolvedValueOnce([{ id: "newFlowId" }]);
    db.returning.mockResolvedValueOnce([{ id: "newEventId" }]);
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(sdkController.createEvent("https://example.com", createEventDto)).resolves.toEqual(
      { id: "newEventId" },
    );
    expect(db.insert).toHaveBeenCalledWith(flows);
  });
  it("should create db event and not user progress for startFlow", async () => {
    await expect(sdkController.createEvent("https://example.com", createEventDto)).resolves.toEqual(
      { id: "newEventId" },
    );
    expect(db.insert).toHaveBeenCalledWith(events);
    expect(db.values).toHaveBeenCalledTimes(1);
    expect(lemonSqueezyService.createUsageRecord).toHaveBeenCalledWith({
      quantity: 1,
      subscriptionItemId: "subItemId",
      action: "increment",
    });
  });
  it("should create db event and user progress for finishFlow", async () => {
    await expect(
      sdkController.createEvent("https://example.com", { ...createEventDto, type: "finishFlow" }),
    ).resolves.toEqual({ id: "newEventId" });
    expect(db.insert).toHaveBeenCalledWith(events);
    expect(db.insert).toHaveBeenCalledWith(flowUserProgresses);
    expect(db.values).toHaveBeenCalledTimes(2);
    expect(lemonSqueezyService.createUsageRecord).not.toHaveBeenCalled();
  });
});

describe("Get preview flow", () => {
  beforeEach(() => {
    db.query.flows.findFirst.mockReturnValue({
      id: "f1",
      human_id: "f1h",
      name: "F1",
      draftVersion: {
        frequency: "once",
        data: { steps: [] },
      },
    });
  });
  it("should throw without flowId", async () => {
    await expect(
      sdkController.getPreviewFlow("https://example.com", "projectId", ""),
    ).rejects.toThrow("Not Found");
  });
  it("should throw with not allowed origin", async () => {
    dbPermissionService.isAllowedOrigin.mockRejectedValue(new Error());
    await expect(
      sdkController.getPreviewFlow("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow();
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(
      sdkController.getPreviewFlow("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow("Not Found");
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow version", async () => {
    db.query.flows.findFirst.mockReturnValue({ publishedVersion: null, draftVersion: null });
    await expect(
      sdkController.getPreviewFlow("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow("Bad Request");
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should return flow", async () => {
    await expect(
      sdkController.getPreviewFlow("https://example.com", "projectId", "flowId"),
    ).resolves.toEqual({
      id: "f1h",
      steps: [],
      frequency: "once",
    });
  });
});

describe("Get flow detail", () => {
  beforeEach(() => {
    db.query.flows.findFirst.mockReturnValue({
      id: "f1",
      human_id: "f1h",
      name: "F1",
      publishedVersion: {
        frequency: "once",
        data: { steps: [] },
      },
    });
    organizationUsageService.getIsOrganizationLimitReachedByProject.mockResolvedValue(false);
  });
  it("should throw without flowId", async () => {
    await expect(
      sdkController.getFlowDetail("https://example.com", "projectId", ""),
    ).rejects.toThrow("Not Found");
  });
  it("should throw without requestDomain", async () => {
    dbPermissionService.isAllowedOrigin.mockRejectedValue(new Error("Not Allowed"));
    await expect(
      sdkController.getFlowDetail("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow("Not Allowed");
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(
      sdkController.getFlowDetail("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow("Not Found");
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow version", async () => {
    db.query.flows.findFirst.mockReturnValue({ publishedVersion: null });
    await expect(
      sdkController.getFlowDetail("https://example.com", "projectId", "flowId"),
    ).rejects.toThrow("Bad Request");
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should return flow", async () => {
    await expect(
      sdkController.getFlowDetail("https://example.com", "projectId", "flowId"),
    ).resolves.toEqual({
      id: "f1h",
      steps: [],
      frequency: "once",
    });
  });
});

describe("Delete event", () => {
  const mockResult = {
    projectId: "projId",
    eventId: "eventId",
    eventType: "tooltipError",
    eventTime: new Date(),
  };
  beforeEach(() => {
    db.where.mockResolvedValue([mockResult]);
  });
  it("should throw without results", async () => {
    db.where.mockResolvedValue([]);
    await expect(sdkController.deleteEvent("https://example.com", "eventId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without projectId", async () => {
    db.where.mockResolvedValue([{ ...mockResult, projectId: null }]);
    await expect(sdkController.deleteEvent("https://example.com", "eventId")).rejects.toThrow(
      "Internal Server Error",
    );
  });
  it("should throw for event older then 15 mins", async () => {
    db.where.mockResolvedValue([
      { ...mockResult, eventTime: new Date(Date.now() - 1000 * 60 * 16) },
    ]);
    await expect(sdkController.deleteEvent("https://example.com", "eventId")).rejects.toThrow(
      "Bad Request",
    );
  });
  it("should delete event", async () => {
    await expect(
      sdkController.deleteEvent("https://example.com", "eventId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(events);
  });
});

describe("Delete user progress", () => {
  beforeEach(() => {
    db.query.flows.findMany.mockReturnValue([{ id: "flowId" }]);
  });
  it("should do nothing without flows", async () => {
    db.query.flows.findMany.mockReturnValue([]);
    await expect(
      sdkController.deleteUserProgress("userHash", "projectId"),
    ).resolves.toBeUndefined();
    expect(db.delete).not.toHaveBeenCalled();
  });
  it("should delete user progress", async () => {
    await expect(
      sdkController.deleteUserProgress("userHash", "projectId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(flowUserProgresses);
  });
  it("should delete user progress with flowId", async () => {
    await expect(
      sdkController.deleteUserProgress("userHash", "projectId", "flowId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(flowUserProgresses);
  });
});
