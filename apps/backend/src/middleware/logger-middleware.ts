import { Injectable, Logger, type NestMiddleware } from "@nestjs/common";
import { type FastifyReply, type FastifyRequest } from "fastify";

import { NewsfeedService } from "../newsfeed/newsfeed.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  constructor(private newsfeedService: NewsfeedService) {}

  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void): void {
    res.on("finish", () => {
      const { method, url } = req;
      const { statusCode } = res;
      const contentLength = res.getHeader("content-length") as string;
      const userAgent = req.headers["user-agent"];
      const ip = req.socket.remoteAddress;

      const logMessage = `${statusCode} ${method} ${url} ${contentLength} - ${userAgent} ${ip}`;

      if (statusCode >= 500) {
        void this.newsfeedService.postIssue({ message: logMessage });
        return this.logger.error(logMessage);
      }
      return this.logger.log(logMessage);
    });

    next();
  }
}
