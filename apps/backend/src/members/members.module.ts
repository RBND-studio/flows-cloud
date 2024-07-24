import { Module } from "@nestjs/common";

import { OrganizationsService } from "../organizations/organizations.service";
import { MembersController } from "./members.controller";
import { MembersService } from "./members.service";

@Module({
  controllers: [MembersController],
  providers: [MembersService, OrganizationsService],
})
export class MembersModule {}
