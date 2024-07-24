import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { flows } from "./flow";

export const flowUserProgresses = pgTable(
  "flow_user_progress",
  {
    user_hash: text("user_hash").notNull(),
    flow_id: uuid("flow_id")
      .notNull()
      .references(() => flows.id, { onDelete: "cascade" }),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.flow_id, table.user_hash] }),
    };
  },
);
