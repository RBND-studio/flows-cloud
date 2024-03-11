import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";

@Injectable()
export class BillingService {
  constructor(private databaseService: DatabaseService) {}

  async handleLemonSqueezyWebhook(body: string): Promise<void> {
    console.log(body);
    throw new Error("Method not implemented.");
  }
}
