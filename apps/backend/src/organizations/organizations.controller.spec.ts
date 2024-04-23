import { Test } from "@nestjs/testing";
import { organizations, organizationsToUsers, userInvite } from "db";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { EmailService } from "../email/email.service";
import { LemonSqueezyService } from "../lemon-squeezy/lemon-squeezy.service";
import type { MockDB, MockDbPermissionService } from "../mocks";
import { getMockDB, getMockDbPermissionService } from "../mocks";
import { getMockLemonSqueezyService, type MockLemonSqueezyService } from "../mocks/lemon-squeezy";
import {
  getMockOrganizationUsageService,
  type MockOrganizationUsageService,
} from "../mocks/organization-usage";
import { OrganizationUsageService } from "../organization-usage/organization-usage.service";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";

let organizationsController: OrganizationsController;
const emailService = {
  sendInvite: jest.fn(),
};

let dbPermissionService: MockDbPermissionService;
let db: MockDB;
let organizationUsageService: MockOrganizationUsageService;
let lemonSqueezyService: MockLemonSqueezyService;

beforeEach(async () => {
  db = getMockDB();
  dbPermissionService = getMockDbPermissionService();
  organizationUsageService = getMockOrganizationUsageService();
  lemonSqueezyService = getMockLemonSqueezyService();

  db.orderBy.mockResolvedValue([{ organization: { id: "org1" } }]);
  db.query.organizations.findFirst.mockResolvedValue({
    id: "org1",
    name: "org",
    organizationsToUsers: [{ user_id: "userId", user: {} }],
  });

  const moduleRef = await Test.createTestingModule({
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
  })
    .useMocker((token) => {
      if (token === DatabaseService) return { db };
      if (token === EmailService) return emailService;
      if (token === DbPermissionService) return dbPermissionService;
      if (token === OrganizationUsageService) return organizationUsageService;
      if (token === LemonSqueezyService) return lemonSqueezyService;
    })
    .compile();

  organizationsController = moduleRef.get(OrganizationsController);
});

//TODO: Fix the test
describe("Get organizations", () => {
  it("should return organizations", async () => {
    await expect(organizationsController.getOrganizations({ userId: "userId" })).resolves.toEqual([
      { organization: { id: "org1" } },
    ]);
  });
});

describe("Get organization detail", () => {
  const mockSubscription = {
    status: "active",
    price_tiers: [
      { last_unit: "10", unit_price_decimal: "10" },
      { last_unit: "inf", unit_price_decimal: "1" },
    ],
  };
  beforeEach(() => {
    db.query.subscriptions.findFirst.mockResolvedValue(mockSubscription);
    organizationUsageService.getOrganizationUsage.mockResolvedValue(20);
  });
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.getOrganizationDetail({ userId: "userId" }, "org1"),
    ).rejects.toThrow("forbidden");
  });
  it("should throw without organization", async () => {
    db.query.organizations.findFirst.mockResolvedValue(null);
    await expect(
      organizationsController.getOrganizationDetail({ userId: "userId" }, "org1"),
    ).rejects.toThrow("Internal Server Error");
  });
  it("should return organization", async () => {
    await expect(
      organizationsController.getOrganizationDetail({ userId: "userId" }, "org1"),
    ).resolves.toEqual({
      id: "org1",
      name: "org",
      estimated_price: 1.1,
      usage: 20,
      subscription: mockSubscription,
    });
  });
});

describe("Create organization", () => {
  beforeEach(() => {
    db.returning.mockResolvedValue([{ id: "org1" }]);
  });
  it("should throw without organization", async () => {
    db.returning.mockResolvedValue([]);
    await expect(
      organizationsController.createOrganization({ userId: "userId" }, { name: "org1" }),
    ).rejects.toThrow("Failed to create organization");
  });
  it("should create organization and user connection and return organization", async () => {
    await expect(
      organizationsController.createOrganization({ userId: "userId" }, { name: "org1" }),
    ).resolves.toEqual({ id: "org1" });
    expect(db.insert).toHaveBeenCalledWith(organizations);
    expect(db.insert).toHaveBeenCalledWith(organizationsToUsers);
  });
});

describe("Update organization", () => {
  beforeEach(() => {
    db.returning.mockResolvedValue([{ id: "org1" }]);
  });
  it("should throw without access", async () => {
    db.query.organizations.findFirst.mockResolvedValue({ organizationsToUsers: [] });
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.updateOrganization({ userId: "userId" }, "org1", { name: "org1" }),
    ).rejects.toThrow("forbidden");
  });
  it("should update organization", async () => {
    await expect(
      organizationsController.updateOrganization({ userId: "userId" }, "org1", { name: "org1" }),
    ).resolves.toEqual({ id: "org1" });
    expect(db.update).toHaveBeenCalledWith(organizations);
    expect(db.set).toHaveBeenCalledWith(
      expect.objectContaining({ name: "org1", updated_at: expect.any(Date) }),
    );
  });
});

describe("Delete organization", () => {
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.deleteOrganization({ userId: "userId" }, "org1"),
    ).rejects.toThrow("forbidden");
  });
  it("should delete organization", async () => {
    await expect(
      organizationsController.deleteOrganization({ userId: "userId" }, "org1"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(organizations);
  });
});

describe("Invite user", () => {
  beforeEach(() => {
    db.query.userInvite.findFirst.mockResolvedValue(null);
    db.returning.mockResolvedValue([{ id: "inviteId" }]);
  });
  it("should throw without access", async () => {
    db.query.organizations.findFirst.mockResolvedValue({ organizationsToUsers: [] });
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).rejects.toThrow("forbidden");
  });
  it("should throw without organization", async () => {
    db.query.organizations.findFirst.mockResolvedValue(null);
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).rejects.toThrow("Internal Server Error");
  });
  it("should throw with user already in organization", async () => {
    db.query.organizations.findFirst.mockResolvedValue({
      organizationsToUsers: [{ user_id: "userId", user: {} }, { user: { email: "email" } }],
    });
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).rejects.toThrow("User already in organization");
  });
  it("should throw with user already invited", async () => {
    db.query.userInvite.findFirst.mockResolvedValue({ id: "inviteId" });
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).resolves.toBeUndefined();
    expect(emailService.sendInvite).toHaveBeenCalledWith({
      email: "email",
      organizationName: "org",
    });
  });
  it("should create invite and send email", async () => {
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).resolves.toBeUndefined();
    expect(db.insert).toHaveBeenCalledWith(userInvite);
    expect(emailService.sendInvite).toHaveBeenCalledWith({
      email: "email",
      organizationName: "org",
    });
  });
});

describe("Remove user", () => {
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.removeUser({ userId: "userId" }, "org1", "anotherUserId"),
    ).rejects.toThrow("forbidden");
  });
  it("should throw if user trying to remove themselves", async () => {
    await expect(
      organizationsController.removeUser({ userId: "userId" }, "org1", "userId"),
    ).rejects.toThrow("Cannot remove yourself from organization");
  });
  it("should delete user from organization", async () => {
    await expect(
      organizationsController.removeUser({ userId: "userId" }, "org1", "anotherUserId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(organizationsToUsers);
  });
});

describe("Delete invite", () => {
  beforeEach(() => {
    db.query.userInvite.findFirst.mockResolvedValue({ organization_id: "org1" });
  });
  it("Should throw without invite", async () => {
    db.query.userInvite.findFirst.mockResolvedValue(null);
    await expect(
      organizationsController.removeInvite({ userId: "userId" }, "inviteId"),
    ).rejects.toThrow("Not Found");
  });
  it("Should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.removeInvite({ userId: "userId" }, "inviteId"),
    ).rejects.toThrow("forbidden");
  });
  it("Should delete invite", async () => {
    await expect(
      organizationsController.removeInvite({ userId: "userId" }, "inviteId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(userInvite);
  });
});

describe("Get organization members", () => {
  beforeEach(() => {
    db.query.organizationsToUsers.findMany.mockResolvedValue([
      { user: { id: "userId", email: "email" } },
    ]);
    db.query.userInvite.findMany.mockResolvedValue([
      { id: "inviteId", email: "email", expires_at: new Date() },
    ]);
  });
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(organizationsController.getUsers({ userId: "userId" }, "org1")).rejects.toThrow(
      "forbidden",
    );
  });
  it("should return members and invites", async () => {
    await expect(organizationsController.getUsers({ userId: "userId" }, "org1")).resolves.toEqual({
      members: [{ id: "userId", email: "email" }],
      pending_invites: [{ id: "inviteId", email: "email", expires_at: expect.any(Date) }],
    });
  });
});

describe("Get Subscription", () => {
  beforeEach(() => {
    db.query.subscriptions.findFirst.mockResolvedValue({ lemon_squeezy_id: "lemonId" });
    lemonSqueezyService.getSubscription.mockResolvedValue({
      data: {
        data: { attributes: { urls: { customer_portal: "cs", update_payment_method: "upm" } } },
      },
    });
  });
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToSubscription.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.getSubscription({ userId: "userId" }, "org1"),
    ).rejects.toThrow("forbidden");
  });
  it("should throw without db subscription", async () => {
    db.query.subscriptions.findFirst.mockResolvedValue(null);
    await expect(
      organizationsController.getSubscription({ userId: "userId" }, "org1"),
    ).rejects.toThrow("Subscription not found");
  });
  it("should throw without ls subscription", async () => {
    lemonSqueezyService.getSubscription.mockResolvedValue({ data: null });
    await expect(
      organizationsController.getSubscription({ userId: "userId" }, "org1"),
    ).rejects.toThrow("Failed to load lemon squeezy subscription");
  });
  it("should return subscription", async () => {
    await expect(
      organizationsController.getSubscription({ userId: "userId" }, "org1"),
    ).resolves.toEqual({ customer_portal_url: "cs", update_payment_method: "upm" });
    expect(lemonSqueezyService.getSubscription).toHaveBeenCalledWith("lemonId");
  });
});

describe("Cancel Subscription", () => {
  beforeEach(() => {
    db.query.subscriptions.findFirst.mockResolvedValue({ lemon_squeezy_id: "lemonId" });
  });
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToSubscription.mockRejectedValue(new Error("forbidden"));
    await expect(
      organizationsController.cancelSubscription({ userId: "userId" }, "org1"),
    ).rejects.toThrow("forbidden");
  });
  it("should throw without subscription", async () => {
    db.query.subscriptions.findFirst.mockResolvedValue(null);
    await expect(
      organizationsController.cancelSubscription({ userId: "userId" }, "org1"),
    ).rejects.toThrow("Subscription not found");
  });
  it("should call lemon squeezy", async () => {
    await expect(
      organizationsController.cancelSubscription({ userId: "userId" }, "org1"),
    ).resolves.toBeUndefined();
    expect(lemonSqueezyService.cancelSubscription).toHaveBeenCalledWith("lemonId");
  });
});

describe("Get Invoices", () => {
  beforeEach(() => {
    db.query.invoices.findMany.mockResolvedValue([{ id: "invoiceId" }]);
  });
  it("should throw without access", async () => {
    dbPermissionService.doesUserHaveAccessToOrganization.mockRejectedValue(new Error("forbidden"));
    await expect(organizationsController.getInvoices({ userId: "userId" }, "org1")).rejects.toThrow(
      "forbidden",
    );
  });
  it("should return db results", async () => {
    await expect(
      organizationsController.getInvoices({ userId: "userId" }, "org1"),
    ).resolves.toEqual([{ id: "invoiceId" }]);
  });
});
