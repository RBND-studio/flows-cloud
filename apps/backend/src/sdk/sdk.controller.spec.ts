import { Test } from "@nestjs/testing";
import { events, flows } from "db";

import { DatabaseService } from "../database/database.service";
import { SdkController } from "./sdk.controller";
import type { CreateEventDto } from "./sdk.dto";
import { SdkService } from "./sdk.service";

let sdkController: SdkController;
const db = {
  query: {
    projects: {
      findFirst: jest.fn(),
    },
    flows: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
  selectDistinctOn: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
};

beforeEach(async () => {
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("Get flows", () => {
  const mockFlows = [
    {
      id: "f1",
      human_id: "f1h",
      name: "F1",
      publishedVersion: {
        frequency: "once",
        data: { steps: [], element: "e1" },
      },
    },
    {
      id: "f2",
      human_id: "f2h",
      name: "F2",
      publishedVersion: {
        frequency: "every-time",
        data: { steps: [], element: "e2" },
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
      { id: "f1h", steps: [], element: "e1", frequency: "once" },
      { id: "f2h", steps: [], element: "e2", frequency: "every-time" },
    ]);
  });
  it("should not return flows if user already seen it", async () => {
    db.orderBy.mockResolvedValue([{ flow_id: "f1", event_time: new Date() }]);
    await expect(sdkController.getFlows("origin", "projId", "userHash")).resolves.toEqual([
      { id: "f2h", steps: [], element: "e2", frequency: "every-time" },
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
    db.returning.mockReturnValue([{ id: "newFlowId" }]);
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
  it("should create local flow if it doesn't exists", async () => {
    db.query.flows.findFirst.mockReturnValue(null);
    await expect(sdkController.createEvent("origin", createEventDto)).resolves.toBeUndefined();
    expect(db.insert).toHaveBeenCalledWith(flows);
  });
  it("should throw with error", async () => {
    db.values.mockRejectedValueOnce(new Error());
    await expect(sdkController.createEvent("origin", createEventDto)).rejects.toThrow(
      "error saving event",
    );
  });
  it("should insert into database", async () => {
    await expect(sdkController.createEvent("origin", createEventDto)).resolves.toBeUndefined();
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
      publishedVersion: {
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
