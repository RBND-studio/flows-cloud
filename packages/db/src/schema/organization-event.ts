import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { organizations } from "./organization";

export const organizationEvents = pgTable("organization_event", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  event_type: text("event_type").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
