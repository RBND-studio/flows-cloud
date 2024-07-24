import { Test } from "@nestjs/testing";
import { organizationsToUsers, userInvite, userMetadata } from "db";

import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { verifyCaptcha } from "../lib/captcha";
import type { MockDB, MockEmailService } from "../mocks";
import { getMockDB, getMockEmailService } from "../mocks";
import { getMockNewsfeedService, type MockNewsfeedService } from "../mocks/newsfeed-service";
import { NewsfeedService } from "../newsfeed/newsfeed.service";
import { MembersController } from "./members.controller";
import { MembersService } from "./members.service";

jest.mock("../lib/captcha", () => ({
  verifyCaptcha: jest.fn(),
}));

let membersController: MembersController;
let db: MockDB;
let newsfeedService: MockNewsfeedService;
let emailService: MockEmailService;

beforeEach(async () => {
  db = getMockDB();
  newsfeedService = getMockNewsfeedService();
  emailService = getMockEmailService();

  const moduleRef = await Test.createTestingModule({
    controllers: [MembersController],
    providers: [MembersService],
  })
    .useMocker((token) => {
      if (token === DatabaseService) return { db };
      if (token === EmailService) return emailService;
      if (token === NewsfeedService) return newsfeedService;
    })
    .compile();
  membersController = moduleRef.get(MembersController);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Get me", () => {
  beforeEach(() => {
    db.query.userMetadata.findFirst.mockResolvedValue({ userId: "userId", role: "user" });
    db.where.mockResolvedValue([{ id: "userId", email: "email", has_password: false }]);
    db.query.userInvite.findMany.mockResolvedValue([
      { id: "inviteId", expires_at: new Date(), organization: { name: "orgName" } },
    ]);
  });
  it("should throw without metadata", async () => {
    db.query.userMetadata.findFirst.mockResolvedValue(null);
    db.returning.mockResolvedValue([]);
    await expect(membersController.me({ userId: "userId" })).rejects.toThrow(
      "Internal Server Error",
    );
    expect(db.insert).toHaveBeenCalledWith(userMetadata);
  });
  it("should throw without user", async () => {
    db.where.mockResolvedValue([]);
    await expect(membersController.me({ userId: "userId" })).rejects.toThrow(
      "Internal Server Error",
    );
  });
  it("should not return invites without email", async () => {
    db.where.mockResolvedValue([{ id: "userId", email: null, has_password: false }]);
    db.query.userMetadata.findFirst.mockResolvedValue({ userId: "userId", role: "user" });
    await expect(membersController.me({ userId: "userId" })).resolves.toEqual({
      pendingInvites: [],
      hasPassword: false,
      role: "user",
    });
  });
  it("should create metadata", async () => {
    db.query.userMetadata.findFirst.mockResolvedValue(null);
    db.returning.mockResolvedValue([{ userId: "userId", role: "user" }]);
    await expect(membersController.me({ userId: "userId" })).resolves.toEqual({
      pendingInvites: [
        { id: "inviteId", expires_at: expect.any(Date), organization_name: "orgName" },
      ],
      hasPassword: false,
      role: "user",
    });
    expect(db.insert).toHaveBeenCalledWith(userMetadata);
    expect(emailService.signedUp).toHaveBeenCalledWith({ email: "email" });
    expect(newsfeedService.postMessage).toHaveBeenCalled();
  });
  it("should return invites", async () => {
    await expect(membersController.me({ userId: "userId" })).resolves.toEqual({
      pendingInvites: [
        { id: "inviteId", expires_at: expect.any(Date), organization_name: "orgName" },
      ],
      hasPassword: false,
      role: "user",
    });
  });
});

describe("Update profile", () => {
  it("should call update", async () => {
    await expect(
      membersController.updateMe({ userId: "userId" }, { finished_welcome: true }),
    ).resolves.toBeUndefined();
    expect(db.update).toHaveBeenCalledWith(userMetadata);
    expect(db.set).toHaveBeenCalledWith({ finished_welcome: true });
  });
});

describe("Accept invite", () => {
  beforeEach(() => {
    db.query.users.findFirst.mockResolvedValue({ id: "userId", email: "email" });
    db.query.userInvite.findFirst.mockResolvedValue({
      id: "inviteId",
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      organization_id: "orgId",
      email: "email",
    });
  });
  it("should throw without invite", async () => {
    db.query.userInvite.findFirst.mockResolvedValue(null);
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw without user", async () => {
    db.query.users.findFirst.mockResolvedValue(null);
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).rejects.toThrow(
      "Internal Server Error",
    );
  });
  it("should throw with expired invite", async () => {
    db.query.userInvite.findFirst.mockResolvedValue({
      id: "inviteId",
      expires_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    });
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).rejects.toThrow(
      "Invite expired",
    );
  });
  it("should throw with user without email", async () => {
    db.query.users.findFirst.mockResolvedValue({
      id: "userId",
      email: null,
    });
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should throw with mismatched email", async () => {
    db.query.users.findFirst.mockResolvedValue({
      id: "userId",
      email: "email2",
    });
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).rejects.toThrow(
      "Not Found",
    );
  });
  it("should accept invite", async () => {
    await expect(membersController.acceptInvite({ userId: "userId" }, "inviteId")).resolves.toEqual(
      {
        organization_id: "orgId",
      },
    );
    expect(db.insert).toHaveBeenCalledWith(organizationsToUsers);
    expect(db.delete).toHaveBeenCalledWith(userInvite);
  });
});

describe("Decline invite", () => {
  beforeEach(() => {
    db.query.users.findFirst.mockResolvedValue({ id: "userId", email: "email" });
    db.query.userInvite.findFirst.mockResolvedValue({
      id: "inviteId",
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      organization_id: "orgId",
      email: "email",
    });
  });
  it("Should delete invite", async () => {
    await expect(
      membersController.declineInvite({ userId: "userId" }, "inviteId"),
    ).resolves.toBeUndefined();
    expect(db.delete).toHaveBeenCalledWith(userInvite);
  });
});

describe("Join waitlist", () => {
  beforeEach(() => {
    (verifyCaptcha as jest.Mock).mockResolvedValue({ success: true });
    emailService.createContact.mockResolvedValue({ success: true });
  });
  it("should throw with invalid captcha", async () => {
    (verifyCaptcha as jest.Mock).mockResolvedValue({ success: false });
    await expect(
      membersController.joinWaitlist({ captcha_token: "cap", email: "mail@examplec.com" }),
    ).rejects.toThrow("Invalid captcha");
  });
  it("should throw with createContact success", async () => {
    emailService.createContact.mockResolvedValue({ success: false, message: "message" });
    await expect(
      membersController.joinWaitlist({ captcha_token: "cap", email: "mail@examplec.com" }),
    ).rejects.toThrow("message");
    expect(emailService.createContact).toHaveBeenCalledWith({ email: "mail@examplec.com" });
  });
  it("should call postMessage", async () => {
    await expect(
      membersController.joinWaitlist({ captcha_token: "cap", email: "mail@examplec.com" }),
    ).resolves.toBeUndefined();
    expect(newsfeedService.postMessage).toHaveBeenCalled();
  });
});

describe("Join newsletter", () => {
  beforeEach(() => {
    db.query.users.findFirst.mockResolvedValue({ email: "email" });
  });
  it("should throw without user", async () => {
    db.query.users.findFirst.mockResolvedValue(null);
    await expect(membersController.joinNewsletter({ userId: "userId" })).rejects.toThrow(
      "Internal Server Error",
    );
  });
  it("should call emailService", async () => {
    await expect(membersController.joinNewsletter({ userId: "userId" })).resolves.toBeUndefined();
    expect(emailService.joinNewsletter).toHaveBeenCalledWith({ email: "email" });
  });
});
