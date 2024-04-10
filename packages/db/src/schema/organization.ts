import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./user";

export const organizations = pgTable("organization", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  start_limit: integer("start_limit").notNull().default(100000),
  free_start_limit: integer("free_start_limit"),
});

export const organizationsToUsers = pgTable("organization_to_user", {
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  organizationsToUsers: many(organizationsToUsers),
}));

export const organizationsToUsersRelations = relations(organizationsToUsers, ({ one }) => ({
  user: one(users, {
    fields: [organizationsToUsers.user_id],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [organizationsToUsers.organization_id],
    references: [organizations.id],
  }),
}));
