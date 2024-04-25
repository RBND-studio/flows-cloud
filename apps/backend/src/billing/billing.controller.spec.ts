import { Test } from "@nestjs/testing";
import { invoices, subscriptions, webhookEvents } from "db";

import { DatabaseService } from "../database/database.service";
import { LemonSqueezyService } from "../lemon-squeezy/lemon-squeezy.service";
import { verifyWebhookSignature } from "../lib/webhook-signature";
import { LogtailService } from "../logtail/logtail.service";
import { getMockDB, type MockDB } from "../mocks";
import { getMockLemonSqueezyService, type MockLemonSqueezyService } from "../mocks/lemon-squeezy";
import { getMockLogtailService, type MockLogtailService } from "../mocks/logtail-service";
import { getMockNewsfeedService, type MockNewsfeedService } from "../mocks/newsfeed-service";
import { mockWebhooks } from "../mocks/webhooks";
import { NewsfeedService } from "../newsfeed/newsfeed.service";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";

jest.mock("../lib/webhook-signature", () => ({
  verifyWebhookSignature: jest.fn(),
}));

let billingController: BillingController;

let db: MockDB;
let lemonSqueezyService: MockLemonSqueezyService;
let newsfeedService: MockNewsfeedService;
let logtailService: MockLogtailService;

beforeEach(async () => {
  db = getMockDB();
  lemonSqueezyService = getMockLemonSqueezyService();
  newsfeedService = getMockNewsfeedService();
  logtailService = getMockLogtailService();

  const moduleRef = await Test.createTestingModule({
    controllers: [BillingController],
    providers: [BillingService],
  })
    .useMocker((token) => {
      if (token === DatabaseService) return { db };
      if (token === LemonSqueezyService) return lemonSqueezyService;
      if (token === NewsfeedService) return newsfeedService;
      if (token === LogtailService) return logtailService;
    })
    .compile();
  billingController = moduleRef.get(BillingController);
});

const mockPriceTiers = [{ last_unit: "inf", unit_price_decimal: "0.1" }];

describe("subscription_created", () => {
  beforeEach(() => {
    (verifyWebhookSignature as jest.Mock).mockReturnValue({ valid: true });
    db.returning.mockResolvedValue([
      {
        event_name: "subscription_created",
        body: mockWebhooks.subscription_created,
      },
    ]);
    lemonSqueezyService.getPrice.mockResolvedValue({
      data: { data: { attributes: { tiers: mockPriceTiers } } },
    });
  });
  it("should throw without raw body", async () => {
    await expect(
      billingController.handleLemonSqueezyWebhook(
        { rawBody: undefined },
        mockWebhooks.subscription_created,
        "sig",
      ),
    ).rejects.toThrow("Bad Request");
  });
  it("should throw with invalid signature", async () => {
    (verifyWebhookSignature as jest.Mock).mockReturnValue({ valid: false });
    await expect(
      billingController.handleLemonSqueezyWebhook(
        { rawBody: Buffer.from("rawBody") },
        mockWebhooks.subscription_created,
        "sig",
      ),
    ).rejects.toThrow("Invalid signature");
  });
  it("should throw with invalid data", async () => {
    await expect(
      billingController.handleLemonSqueezyWebhook({ rawBody: Buffer.from("rawBody") }, {}, "sig"),
    ).rejects.toThrow("Data invalid");
  });
  it("should throw without webhook db entity", async () => {
    db.returning.mockResolvedValue([]);
    await expect(
      billingController.handleLemonSqueezyWebhook(
        { rawBody: Buffer.from("rawBody") },
        mockWebhooks.subscription_created,
        "sig",
      ),
    ).rejects.toThrow("Bad Request");
    expect(db.insert).toHaveBeenCalledWith(webhookEvents);
  });
  it("should get price and create subscription db entity", async () => {
    await expect(
      billingController.handleLemonSqueezyWebhook(
        { rawBody: Buffer.from("rawBody") },
        mockWebhooks.subscription_created,
        "sig",
      ),
    ).resolves.toBeUndefined();
    expect(db.insert).toHaveBeenCalledWith(subscriptions);
    expect(db.values).toHaveBeenCalledWith(
      expect.objectContaining({
        price_tiers: mockPriceTiers,
      }),
    );
    expect(db.update).toHaveBeenCalledWith(webhookEvents);
    expect(db.set).toHaveBeenCalledWith({ processed: true, processing_error: null });
  });
});

describe("subscription_payment_success", () => {
  beforeEach(() => {
    (verifyWebhookSignature as jest.Mock).mockReturnValue({ valid: true });
    db.returning.mockResolvedValue([
      {
        event_name: "subscription_payment_success",
        body: mockWebhooks.subscription_payment_success,
      },
    ]);
  });
  it("should create invoice db entity", async () => {
    await expect(
      billingController.handleLemonSqueezyWebhook(
        { rawBody: Buffer.from("rawBody") },
        mockWebhooks.subscription_payment_success,
        "sig",
      ),
    ).resolves.toBeUndefined();
    expect(db.insert).toHaveBeenCalledWith(invoices);
    expect(db.update).toHaveBeenCalledWith(webhookEvents);
    expect(db.set).toHaveBeenCalledWith({ processed: true, processing_error: null });
  });
});
