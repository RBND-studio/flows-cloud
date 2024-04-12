import type { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { minutes, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import cors from "cors";

import { AppController } from "./app.controller";
import { BillingModule } from "./billing/billing.module";
import { CssModule } from "./css/css.module";
import { DatabaseModule } from "./database/database.module";
import { DbPermissionModule } from "./db-permission/db-permission.module";
import { EmailModule } from "./email/email.module";
import { FlowsModule } from "./flows/flows.module";
import { LemonSqueezyModule } from "./lemon-squeezy/lemon-squeezy.module";
import { LogtailModule } from "./logtail/logtail.module";
import { LoggerMiddleware } from "./middleware/logger-middleware";
import { NewsfeedModule } from "./newsfeed/newsfeed.module";
import { OrganizationUsageModule } from "./organization-usage/organization-usage.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { ProjectsModule } from "./projects/projects.module";
import { SdkModule } from "./sdk/sdk.module";
import { UsersModule } from "./users/users.module";

const publicRoutes: string[] = [
  "/sdk/flows",
  "/sdk/events",
  "/sdk/events/:eventId",
  "/sdk/flows/:flowId",
  "/sdk/flows/:flowId/draft",
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 250,
      },
    ]),
    DatabaseModule,
    DbPermissionModule,
    OrganizationUsageModule,
    LemonSqueezyModule,
    EmailModule,
    NewsfeedModule,
    SdkModule,
    FlowsModule,
    ProjectsModule,
    OrganizationsModule,
    UsersModule,
    CssModule,
    BillingModule,
    LogtailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        cors({
          origin: [
            "https://flows.sh",
            "https://stage.flows.sh",
            "https://app.flows.sh",
            "https://app.stage.flows.sh",
            "http://localhost:6001",
            "http://localhost:6002",
          ],
        }),
      )
      .exclude(...publicRoutes)
      .forRoutes("*");
    consumer.apply(cors()).forRoutes(...publicRoutes);
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
