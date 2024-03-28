import { Global, Module } from "@nestjs/common";

import { LemonSqueezyService } from "./lemon-squeezy.service";

@Global()
@Module({
  providers: [LemonSqueezyService],
  exports: [LemonSqueezyService],
})
export class LemonSqueezyModule {}
