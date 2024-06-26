import { Test } from "@nestjs/testing";
import { flows, flowVersions } from "db";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import type { MockDB, MockDbPermissionService } from "../mocks";
import { getMockDB, getMockDbPermissionService } from "../mocks";
import { FlowsController } from "./flows.controller";
import type { UpdateFlowDto } from "./flows.dto";
import { FlowsService } from "./flows.service";

let flowsController: FlowsController;

jest.mock("drizzle-orm/pg-core", (): unknown => ({
  ...jest.requireActual("drizzle-orm/pg-core"),
  union: jest
    .fn()
    .mockImplementation((...args: Promise<unknown>[]) =>
      Promise.all(args).then((promises) => promises.flat()),
    ),
}));

let dbPermissionService: MockDbPermissionService;
let db: MockDB;

beforeEach(async () => {
  db = getMockDB();
  dbPermissionService = getMockDbPermissionService();

  const moduleRef = await Test.createTestingModule({
    controllers: [FlowsController],
    providers: [FlowsService],
  })
    .useMocker((token) => {
      if (token === DatabaseService) {
        return { db };
      }
      if (token === DbPermissionService) {
        return dbPermissionService;
      }
    })
    .compile();
  flowsController = moduleRef.get(FlowsController);
});

describe("Get flows", () => {
  beforeEach(() => {
    db.groupBy.mockResolvedValue([{ start_count: 2, id: "flowId" }]);
  });
  it("should throw without project", async () => {
    dbPermissionService.doesUserHaveAccessToProject.mockRejectedValue(new Error());
    await expect(flowsController.getFlows({ userId: "userId" }, "projectId")).rejects.toThrow();
  });
  it("should return flows", async () => {
    await expect(flowsController.getFlows({ userId: "userId" }, "projectId")).resolves.toEqual([
      { id: "flowId", start_count: 2 },
    ]);
  });
});

describe("Get flow detail", () => {
  beforeEach(() => {
    db.query.flows.findFirst.mockResolvedValue({
      id: "flowId",
      draftVersion: { data: { steps: [], userProperties: [] } },
    });
    db.where.mockResolvedValueOnce({ count: 2, type: "uniqueUsers" });
    db.groupBy.mockResolvedValueOnce({ count: 1, type: "type" });
  });

  it("should throw without access to flow", async () => {
    dbPermissionService.doesUserHaveAccessToFlow.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(flowsController.getFlowDetail({ userId: "userId" }, "flowId")).rejects.toThrow(
      "no access",
    );
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockResolvedValue(null);
    await expect(flowsController.getFlowDetail({ userId: "userId" }, "flowId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should return flow", async () => {
    await expect(flowsController.getFlowDetail({ userId: "userId" }, "flowId")).resolves.toEqual({
      id: "flowId",
      draftVersion: { steps: [], userProperties: [] },
      preview_stats: [
        { count: 1, type: "type" },
        { count: 2, type: "uniqueUsers" },
      ],
    });
  });
});

describe("Get flow analytics", () => {
  beforeEach(() => {
    db.orderBy.mockResolvedValue([{ count: 2 }]);
    db.leftJoin.mockResolvedValueOnce([{ count: 1 }]);
    db.query.flows.findFirst.mockResolvedValue({ created_at: new Date() });
  });
  it("should throw without flow", async () => {
    dbPermissionService.doesUserHaveAccessToFlow.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(flowsController.getFlowAnalytics({ userId: "userId" }, "flowId")).rejects.toThrow(
      "no access",
    );
  });
  it("should return flow analytics", async () => {
    await expect(flowsController.getFlowAnalytics({ userId: "userId" }, "flowId")).resolves.toEqual(
      { daily_stats: [{ count: 1 }, { count: 2 }] },
    );
  });
});

describe("Update flow", () => {
  const mockFlow = {
    id: "flowId",
    draftVersion: { data: { steps: [], userProperties: [], start: [{ location: "/old-loc" }] } },
    publishedVersion: {
      data: { steps: [], userProperties: [], start: [{ location: "/published-loc" }] },
    },
  };
  beforeEach(() => {
    db.query.flows.findFirst.mockResolvedValue(mockFlow);
    db.returning.mockResolvedValue([{ id: "newVerId" }]);
  });
  const data: UpdateFlowDto = {
    name: "newName",
    human_id: "new human id",
    enabled: true,
    description: "new description",
    start: [{ location: "/new-loc" }],
  };
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToFlow.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(flowsController.updateFlow({ userId: "userId" }, "flowId", data)).rejects.toThrow(
      "no access",
    );
  });
  it("should throw without flow", async () => {
    db.query.flows.findFirst.mockResolvedValue(null);
    await expect(flowsController.updateFlow({ userId: "userId" }, "flowId", data)).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without new version", async () => {
    db.returning.mockResolvedValue([]);
    await expect(flowsController.updateFlow({ userId: "userId" }, "flowId", data)).rejects.toThrow(
      "Failed to update data",
    );
  });
  it("should not create new version without data", async () => {
    await expect(
      flowsController.updateFlow({ userId: "userId" }, "flowId", {
        name: "newName",
      }),
    ).resolves.toBeUndefined();
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("should not create new version without changes", async () => {
    await expect(
      flowsController.updateFlow({ userId: "userId" }, "flowId", {
        start: [{ location: "/old-loc" }],
      }),
    ).resolves.toBeUndefined();
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("should delete draft version if it's the same as published", async () => {
    db.query.flows.findFirst.mockResolvedValue({ ...mockFlow, draft_version_id: "draftVerId" });
    await expect(
      flowsController.updateFlow({ userId: "userId" }, "flowId", {
        start: [{ location: "/published-loc" }],
      }),
    ).resolves.toBeUndefined();
    expect(db.insert).not.toHaveBeenCalled();
    expect(db.delete).toHaveBeenCalled();
  });
  it("should create new version and update flow", async () => {
    await expect(
      flowsController.updateFlow({ userId: "userId" }, "flowId", data),
    ).resolves.toBeUndefined();
    expect(db.insert).toHaveBeenCalledWith(flowVersions);
    expect(db.update).toHaveBeenCalledWith(flows);
    expect(db.set).toHaveBeenCalledWith({
      draft_version_id: "newVerId",
      name: "newName",
      updated_at: expect.any(Date),
      description: "new description",
      enabled_at: expect.any(Date),
      human_id: "new human id",
    });
  });
});

describe("Create flow", () => {
  beforeEach(() => {
    db.returning.mockResolvedValue([{ id: "flowId" }]);
    db.query.flows.findMany.mockResolvedValue([]);
  });
  const data = { name: "newName", data: JSON.stringify({ el: "newEl" }) };
  it("should throw access", async () => {
    dbPermissionService.doesUserHaveAccessToProject.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(
      flowsController.createFlow({ userId: "userId" }, "projectId", data),
    ).rejects.toThrow("no access");
  });

  it("should throw without new flow", async () => {
    db.returning.mockResolvedValue([]);
    await expect(
      flowsController.createFlow({ userId: "userId" }, "projectId", data),
    ).rejects.toThrow("Failed to create flow");
  });
  it("should create human_id with number if it exists", async () => {
    db.query.flows.findMany.mockResolvedValue([{ human_id: "newname" }]);
    await expect(
      flowsController.createFlow({ userId: "userId" }, "projectId", data),
    ).resolves.toEqual({ id: "flowId", start_count: 0 });
    expect(db.values).toHaveBeenCalledWith(expect.objectContaining({ human_id: "newname_01" }));
  });
  it("should return new flow", async () => {
    await expect(
      flowsController.createFlow({ userId: "userId" }, "projectId", data),
    ).resolves.toEqual({ id: "flowId", start_count: 0 });
    expect(db.values).toHaveBeenCalledWith(expect.objectContaining({ human_id: "newname" }));
  });
});

describe("Delete flow", () => {
  it("should throw access", async () => {
    dbPermissionService.doesUserHaveAccessToFlow.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(flowsController.deleteFlow({ userId: "userId" }, "flowId")).rejects.toThrow(
      "no access",
    );
  });
  it("should delete flow", async () => {
    await expect(
      flowsController.deleteFlow({ userId: "userId" }, "flowId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalled();
  });
});

describe("Get flow versions", () => {
  beforeEach(() => {
    db.query.flowVersions.findMany.mockResolvedValue([{ id: "flowVerId" }]);
  });
  it("should throw access", async () => {
    dbPermissionService.doesUserHaveAccessToFlow.mockImplementationOnce(() => {
      throw new Error("no access");
    });
    await expect(flowsController.getFlowVersions({ userId: "userId" }, "flowId")).rejects.toThrow(
      "no access",
    );
  });
  it("should return flow versions", async () => {
    await expect(flowsController.getFlowVersions({ userId: "userId" }, "flowId")).resolves.toEqual([
      { id: "flowVerId" },
    ]);
  });
});
