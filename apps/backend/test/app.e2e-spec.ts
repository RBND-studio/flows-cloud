import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/app.module";
import { DatabaseService } from "../src/database/database.service";
import { LemonSqueezyService } from "../src/lemon-squeezy/lemon-squeezy.service";

jest.mock("@nestjs/throttler", (): unknown => ({
  ...jest.requireActual("@nestjs/throttler"),
  ThrottlerGuard: jest.fn(() => ({ canActivate: () => true })),
}));

describe("AppController (e2e)", () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseService)
      .useValue({})
      .overrideProvider(LemonSqueezyService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.enableVersioning();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it("/status (GET)", () => {
    return request(app.getHttpServer()).get("/status").expect(200).expect("true");
  });
});
