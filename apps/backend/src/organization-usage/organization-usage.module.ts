import { Global, Module } from "@nestjs/common";

import { OrganizationUsageService } from "./organization-usage.service";

@Global()
@Module({
  providers: [OrganizationUsageService],
  exports: [OrganizationUsageService],
})
export class OrganizationUsageModule {}
