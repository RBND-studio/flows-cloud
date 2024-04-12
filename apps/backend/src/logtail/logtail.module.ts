import { Global, Module } from "@nestjs/common";

import { LogtailService } from "./logtail.service";

@Global()
@Module({
  providers: [LogtailService],
  exports: [LogtailService],
})
export class LogtailModule {}
