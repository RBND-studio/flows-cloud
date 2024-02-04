import { Test } from "@nestjs/testing";
import { events, flows } from "db";

import { DatabaseService } from "../database/database.service";
import { getMockDB, type MockDB } from "../mocks";
import { SdkController } from "./sdk.controller";
import type { CreateEventDto } from "./sdk.dto";
import { SdkService } from "./sdk.service";

let sdkController: SdkController;
let db: MockDB;

beforeEach(async () => {
  db = getMockDB();
  const moduleRef = await Test.createTestingModule({
    controllers: [SdkController],
    providers: [SdkService],
  })

    .useMocker((token) => {
      if (token === DatabaseService) {
        return { db };
      }
    })
    .compile();

  sdkController = moduleRef.get(SdkController);
});

describe("Get css", () => {
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue({ css_vars: "vars", css_template: "template" });
  });
  it("should throw without projectId", async () => {
    await expect(sdkController.getCss("", "latest")).rejects.toThrow("Not Found");
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.getCss("projectId", "latest")).rejects.toThrow("Not Found");
  });
  it("should return css", async () => {
    await expect(sdkController.getCss("projectId", "latest")).resolves.toEqual("vars\ntemplate");
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
        data: { steps: [{}], element: "e1" },
      },
    },
    {
      id: "f2",
      human_id: "f2h",
      name: "F2",
      publishedVersion: {
        frequency: "every-time",
        data: { steps: [{}, {}], element: "e2" },
      },
    },
  ];
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue({ id: "p1" });
    db.query.flows.findMany.mockReturnValue(mockFlows);
  });
  it("should throw without projectId", async () => {
    await expect(sdkController.getFlows("origin", "")).rejects.toThrow("Not Found");
  });
  it("should throw without requestDomain", async () => {
    await expect(sdkController.getFlows("", "projId")).rejects.toThrow("Not Found");
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.getFlows("origin", "projId")).rejects.toThrow("Not Found");
  });
  it("should not return flows without published version", async () => {
    db.query.flows.findMany.mockReturnValue(
      mockFlows.map((f) => ({ ...f, publishedVersion: null, draftVersion: f.publishedVersion })),
    );
    await expect(sdkController.getFlows("origin", "projId")).resolves.toEqual([]);
  });
  it("should return flows", async () => {
    await expect(sdkController.getFlows("origin", "projId")).resolves.toEqual([
      { id: "f1h", steps: [{}], element: "e1", frequency: "once" },
      { id: "f2h", steps: [{}], element: "e2", frequency: "every-time", _incompleteSteps: true },
    ]);
  });
  it("should not return flows if user already seen it", async () => {
    db.orderBy.mockResolvedValue([{ flow_id: "f1", event_time: new Date() }]);
    await expect(sdkController.getFlows("origin", "projId", "userHash")).resolves.toEqual([
      { id: "f2h", steps: [{}], element: "e2", frequency: "every-time", _incompleteSteps: true },
    ]);
  });
});

describe("Create event", () => {
  const createEventDto: CreateEventDto = {
    type: "a",
    eventTime: new Date(),
    flowId: "b",
    stepIndex: "c",
    userHash: "d",
    flowHash: "e",
    stepHash: "f",
    projectId: "g",
    sdkVersion: "0.0.0",
    location: "/",
  };
  const project = {
    id: "pid",
  };
  const flow = {
    id: "fid",
  };
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue(project);
    db.query.flows.findFirst.mockReturnValue(flow);
    db.returning.mockResolvedValueOnce([{ id: "newEventId" }]);
  });
  it("should throw without requestDomain", async () => {
    await expect(sdkController.createEvent("", createEventDto)).rejects.toThrow(
      "Origin is required",
    );
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.createEvent("origin", createEventDto)).rejects.toThrow(
      "project not found",
    );
  });
  it("should throw with no created event", async () => {
    db.returning.mockReset();
    db.returning.mockResolvedValue([]);
    await expect(sdkController.createEvent("origin", createEventDto)).rejects.toThrow(
      "error saving event",
    );
  });
  it("should create local flow if it doesn't exist", async () => {
    db.returning.mockReset();
    db.returning.mockResolvedValueOnce([{ id: "newFlowId" }]);
    db.returning.mockResolvedValueOnce([{ id: "newEventId" }]);
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(sdkController.createEvent("origin", createEventDto)).resolves.toEqual({
      id: "newEventId",
    });
    expect(db.insert).toHaveBeenCalledWith(flows);
  });
  it("should insert into database", async () => {
    await expect(sdkController.createEvent("origin", createEventDto)).resolves.toEqual({
      id: "newEventId",
    });
    expect(db.insert).toHaveBeenCalledWith(events);
    expect(db.values).toHaveBeenCalled();
  });
});

describe("Get preview flow", () => {
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue({ id: "p1" });
    db.query.flows.findFirst.mockReturnValue({
      id: "f1",
      human_id: "f1h",
      name: "F1",
      draftVersion: {
        frequency: "once",
        data: { steps: [], element: "e1" },
      },
    });
  });
  it("should throw without projectId", async () => {
    await expect(sdkController.getPreviewFlow("origin", "", "flowId")).rejects.toThrow("Not Found");
  });
  it("should throw without requestDomain", async () => {
    await expect(sdkController.getPreviewFlow("", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without flowId", async () => {
    await expect(sdkController.getPreviewFlow("origin", "projectId", "")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.getPreviewFlow("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.projects.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(sdkController.getPreviewFlow("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow version", async () => {
    db.query.flows.findFirst.mockReturnValue({ publishedVersion: null, draftVersion: null });
    await expect(sdkController.getPreviewFlow("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should return flow", async () => {
    await expect(sdkController.getPreviewFlow("origin", "projectId", "flowId")).resolves.toEqual({
      id: "f1h",
      steps: [],
      element: "e1",
      frequency: "once",
    });
  });
});

describe("Get flow detail", () => {
  beforeEach(() => {
    db.query.projects.findFirst.mockReturnValue({ id: "p1" });
    db.query.flows.findFirst.mockReturnValue({
      id: "f1",
      human_id: "f1h",
      name: "F1",
      publishedVersion: {
        frequency: "once",
        data: { steps: [], element: "e1" },
      },
    });
  });
  it("should throw without projectId", async () => {
    await expect(sdkController.getFlowDetail("origin", "", "flowId")).rejects.toThrow("Not Found");
  });
  it("should throw without requestDomain", async () => {
    await expect(sdkController.getFlowDetail("", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without flowId", async () => {
    await expect(sdkController.getFlowDetail("origin", "projectId", "")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without project", async () => {
    db.query.projects.findFirst.mockReturnValue(null);
    await expect(sdkController.getFlowDetail("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.projects.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(sdkController.getFlowDetail("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should throw without flow version", async () => {
    db.query.flows.findFirst.mockReturnValue({ publishedVersion: null });
    await expect(sdkController.getFlowDetail("origin", "projectId", "flowId")).rejects.toThrow(
      "Not Found",
    );
    expect(db.query.flows.findFirst).toHaveBeenCalled();
  });
  it("should return flow", async () => {
    await expect(sdkController.getFlowDetail("origin", "projectId", "flowId")).resolves.toEqual({
      id: "f1h",
      steps: [],
      element: "e1",
      frequency: "once",
    });
  });
});

describe("Delete event", () => {
  beforeEach(() => {
    db.where.mockResolvedValue([
      {
        projectId: "projId",
        flowId: "flowId",
        event: { type: "tooltipError", event_time: new Date() },
      },
    ]);
  });
  it("should throw without requestDomain or eventId", async () => {
    await expect(sdkController.deleteEvent("", "eventId")).rejects.toThrow("Not Found");
    await expect(sdkController.deleteEvent("origin", "")).rejects.toThrow("Not Found");
  });
  it("should throw without results", async () => {
    db.where.mockResolvedValue([]);
    await expect(sdkController.deleteEvent("origin", "eventId")).rejects.toThrow("Not Found");
  });
  it("should throw for event older then 15 mins", async () => {
    db.where.mockResolvedValue([
      {
        projectId: "projId",
        flowId: "flowId",
        event: {
          type: "tooltipError",
          event_time: new Date(Date.now() - 1000 * 60 * 16),
        },
      },
    ]);
    await expect(sdkController.deleteEvent("origin", "eventId")).rejects.toThrow("Not Found");
  });
  it("should delete event", async () => {
    await expect(sdkController.deleteEvent("origin", "eventId")).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(events);
  });
});