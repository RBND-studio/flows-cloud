import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { organizations, organizationsToUsers, userInvite } from "db";

import { DatabaseService } from "../database/database.service";
import { DbPermissionService } from "../db-permission/db-permission.service";
import { EmailService } from "../email/email.service";
import type { MockDB, MockDbPermissionService } from "../mocks";
import { getMockDB, getMockDbPermissionService } from "../mocks";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";

let organizationsController: OrganizationsController;
const emailService = {
  sendInvite: jest.fn(),
};

let dbPermissionService: MockDbPermissionService;
let db: MockDB;

beforeEach(async () => {
  db = getMockDB();
  dbPermissionService = getMockDbPermissionService();

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
      if (token === DatabaseService) {
        return { db };
      }
      if (token === EmailService) {
        return emailService;
      }
      if (token === DbPermissionService) {
        return dbPermissionService;
      }
    })
    .compile();

  organizationsController = moduleRef.get(OrganizationsController);
});

describe("Get organizations", () => {
  it("should return organizations", async () => {
    await expect(organizationsController.getOrganizations({ userId: "userId" })).resolves.toEqual([
      { id: "org1" },
    ]);
  });
});

describe("Get organization detail", () => {
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
    ).rejects.toThrow("Not Found");
  });
  it("should return organization", async () => {
    await expect(
      organizationsController.getOrganizationDetail({ userId: "userId" }, "org1"),
    ).resolves.toEqual({ id: "org1", name: "org" });
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
  it("should throw without organization", async () => {
    db.query.organizations.findFirst.mockResolvedValue(null);
    dbPermissionService.doesUserHaveAccessToOrganization.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    await expect(
      organizationsController.updateOrganization({ userId: "userId" }, "org1", { name: "org1" }),
    ).rejects.toThrow("Not Found");
  });
  it("should throw without access", async () => {
    db.query.organizations.findFirst.mockResolvedValue({ organizationsToUsers: [] });
    dbPermissionService.doesUserHaveAccessToOrganization.mockImplementationOnce(() => {
      throw new ForbiddenException();
    });
    await expect(
      organizationsController.updateOrganization({ userId: "userId" }, "org1", { name: "org1" }),
    ).rejects.toThrow("Forbidden");
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
    ).rejects.toThrow("Not Found");
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
  it("should throw without new invite", async () => {
    db.returning.mockResolvedValue([]);
    await expect(
      organizationsController.inviteUser({ userId: "userId" }, "org1", { email: "email" }),
    ).rejects.toThrow("Failed to create invite");
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
