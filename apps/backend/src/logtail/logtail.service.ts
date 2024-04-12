import { Logtail } from "@logtail/node";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogtailService {
  logtail?: Logtail;

  constructor() {
    if (process.env.NODE_ENV === "test") return;
    this.logtail = new Logtail(process.env.BACKEND_LOGTAIL_TOKEN);
  }
}
