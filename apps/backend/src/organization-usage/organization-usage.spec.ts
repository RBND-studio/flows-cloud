import { Test } from "@nestjs/testing";
import { FREE_LIMIT } from "shared";

import { DatabaseService } from "../database/database.service";
import { getMockDB, type MockDB } from "../mocks";
import { OrganizationUsageService } from "./organization-usage.service";

let organizationUsageService: OrganizationUsageService;
let db: MockDB;

beforeEach(async () => {
  db = getMockDB();

  const moduleRef = await Test.createTestingModule({
    providers: [OrganizationUsageService],
    exports: [],
  })
    .useMocker((token) => {
      if (token === DatabaseService) return { db };
    })
    .compile();
  organizationUsageService = moduleRef.get(OrganizationUsageService);
});

describe("getOrganizationLimit", () => {
  const mockResult = {
    subscriptionId: "subId",
    organizationStartLimit: 10000,
    organizationFreeStartLimit: 10,
  };
  beforeEach(() => {
    db.where.mockResolvedValue([mockResult]);
  });
  it("should throw without result", async () => {
    db.where.mockResolvedValue([]);
    await expect(
      organizationUsageService.getOrganizationLimit({ organizationId: "orgId" }),
    ).rejects.toThrow("Internal Server Error");
  });
  it("should return organizationStartLimit with subscription", async () => {
    await expect(
      organizationUsageService.getOrganizationLimit({ organizationId: "orgId" }),
    ).resolves.toBe(10000);
  });
  it("should return organizationFreeStartLimit without subscription", async () => {
    db.where.mockResolvedValue([{ ...mockResult, subscriptionId: null }]);
    await expect(
      organizationUsageService.getOrganizationLimit({ organizationId: "orgId" }),
    ).resolves.toBe(10);
  });
  it("should return FREE_LIMIT without subscription and organizationFreeStartLimit", async () => {
    db.where.mockResolvedValue([
      { ...mockResult, organizationFreeStartLimit: null, subscriptionId: null },
    ]);
    await expect(
      organizationUsageService.getOrganizationLimit({ organizationId: "orgId" }),
    ).resolves.toBe(FREE_LIMIT);
  });
});
