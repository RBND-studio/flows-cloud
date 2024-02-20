import { pgEnum, pgSchema, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id"),
  email: varchar("email"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
  confirmed_at: timestamp("confirmed_at"),
  last_sign_in_at: timestamp("last_sign_in_at"),
});

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export enum UserRoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export const userMetadata = pgTable("user_metadata", {
  user_id: uuid("user_id")
    .notNull()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  role: userRoleEnum("role").notNull().default("user"),
});
