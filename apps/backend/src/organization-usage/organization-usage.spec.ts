import { Test } from "@nestjs/testing";
import { organizationEvents } from "db";
import { FREE_LIMIT } from "shared";

import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import {
  getMockDB,
  getMockEmailService,
  getMockNewsfeedService,
  type MockDB,
  type MockEmailService,
  type MockNewsfeedService,
} from "../mocks";
import { NewsfeedService } from "../newsfeed/newsfeed.service";
import { OrganizationUsageService } from "./organization-usage.service";

let organizationUsageService: OrganizationUsageService;
let db: MockDB;
let emailService: MockEmailService;
let newsfeedService: MockNewsfeedService;

beforeEach(async () => {
  db = getMockDB();
  emailService = getMockEmailService();
  newsfeedService = getMockNewsfeedService();

  const moduleRef = await Test.createTestingModule({
    providers: [OrganizationUsageService],
    exports: [],
  })
    .useMocker((token) => {
      if (token === DatabaseService) return { db };
      if (token === EmailService) return emailService;
      if (token === NewsfeedService) return newsfeedService;
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

describe("sendUsageAlertIfNeeded", () => {
  let getOrganizationLimit = jest.fn();
  let getOrganizationUsage = jest.fn();
  beforeEach(() => {
    db.query.organizationEvents.findFirst.mockResolvedValue(null);
    db.query.organizations.findFirst.mockResolvedValue({ name: "orgName" });
    db.query.organizationsToUsers.findMany.mockResolvedValue([
      { user: { email: "test@test.com" } },
    ]);
    db.query.subscriptions.findFirst.mockResolvedValue({ renews_at: new Date("2022-01-01") });

    getOrganizationLimit = jest.fn().mockResolvedValue(10);
    getOrganizationUsage = jest.fn().mockResolvedValue(9);
    organizationUsageService.getOrganizationLimit = getOrganizationLimit;
    organizationUsageService.getOrganizationUsage = getOrganizationUsage;
  });
  it("should do nothing if event already exists", async () => {
    db.query.organizationEvents.findFirst.mockResolvedValue({ id: "event-id" });
    await expect(
      organizationUsageService.sendUsageAlertIfNeeded({
        organizationId: "orgId",
        alert: "approachingUsageLimit",
      }),
    ).resolves.toBeUndefined();
    expect(getOrganizationLimit).not.toHaveBeenCalled();
    expect(getOrganizationUsage).not.toHaveBeenCalled();
  });
  it("should do nothing if limit is not reached", async () => {
    await expect(
      organizationUsageService.sendUsageAlertIfNeeded({
        organizationId: "orgId",
        alert: "approachingUsageLimit",
      }),
    ).resolves.toBeUndefined();
    expect(getOrganizationLimit).toHaveBeenCalledWith({ organizationId: "orgId" });
    expect(getOrganizationUsage).toHaveBeenCalledWith({ organizationId: "orgId" });
  });
  it("should throw without organization", async () => {
    db.query.organizations.findFirst.mockResolvedValue(null);
    await expect(
      organizationUsageService.sendUsageAlertIfNeeded({
        organizationId: "orgId",
        alert: "approachingUsageLimit",
      }),
    ).rejects.toThrow("Organization not found");
  });
  it("should not call sendUsageAlert if threshold is not reached", async () => {
    await expect(
      organizationUsageService.sendUsageAlertIfNeeded({
        organizationId: "orgId",
        alert: "exceededUsageLimit",
      }),
    ).resolves.toBeUndefined();
    expect(getOrganizationLimit).toHaveBeenCalledWith({ organizationId: "orgId" });
    expect(getOrganizationUsage).toHaveBeenCalledWith({ organizationId: "orgId" });
    expect(db.insert).not.toHaveBeenCalled();
    expect(emailService.sendUsageAlert).not.toHaveBeenCalled();
  });
  it("should call sendUsageAlert if threshold is reached", async () => {
    await expect(
      organizationUsageService.sendUsageAlertIfNeeded({
        organizationId: "orgId",
        alert: "approachingUsageLimit",
      }),
    ).resolves.toBeUndefined();
    expect(getOrganizationLimit).toHaveBeenCalledWith({ organizationId: "orgId" });
    expect(getOrganizationLimit).toHaveBeenCalledWith({ organizationId: "orgId" });
    expect(db.insert).toHaveBeenCalledWith(organizationEvents);
    expect(db.query.organizations.findFirst).toHaveBeenCalled();
    expect(db.query.organizationsToUsers.findMany).toHaveBeenCalled();
    expect(newsfeedService.postMessage).toHaveBeenCalled();
    expect(db.query.subscriptions.findFirst).toHaveBeenCalled();
    expect(emailService.sendUsageAlert).toHaveBeenCalledWith({
      isOrganizationSubscribed: true,
      email: "test@test.com",
      organizationId: "orgId",
      organizationName: "orgName",
      limit: 10,
      usage: 9,
      type: "approachingUsageLimit",
      renewsAt: "January 1, 2022",
    });
  });
});
