import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { organizations } from "./organization";

export const projects = pgTable(
  "project",
  {
    id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
    organization_id: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    domains: text("domains").array().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      organizationIdIdx: index("organization_id_idx").on(table.organization_id),
      domainIdx: index("domain_idx").on(table.domains),
    };
  },
);
