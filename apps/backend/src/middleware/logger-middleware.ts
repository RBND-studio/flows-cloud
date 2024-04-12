import { Injectable, Logger, type NestMiddleware } from "@nestjs/common";
import { type FastifyReply, type FastifyRequest } from "fastify";

import { LogtailService } from "../logtail/logtail.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  constructor(private logtailService: LogtailService) {}

  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void): void {
    res.on("finish", () => {
      const { method, url } = req;
      const { statusCode } = res;
      const contentLength = res.getHeader("content-length") as string;
      const userAgent = req.headers["user-agent"];
      const ip = req.socket.remoteAddress;

      const logMessage = `${statusCode} ${method} ${url} ${contentLength} - ${userAgent} ${ip}`;

      if (statusCode >= 500) {
        void this.logtailService.logtail?.error(logMessage, {
          status: statusCode,
          method,
          url,
          contentLength,
          userAgent,
          ip,
        });
        return this.logger.error(logMessage);
      }
      void this.logtailService.logtail?.info(logMessage, {
        status: statusCode,
        method,
        url,
        contentLength,
        userAgent,
        ip,
      });
      return this.logger.log(logMessage);
    });

    next();
  }
}
