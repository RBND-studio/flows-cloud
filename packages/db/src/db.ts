import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export const db = (
  connectionString: string,
): { db: PostgresJsDatabase<typeof schema>; sql: postgres.Sql } => {
  const sql = postgres(connectionString, { max: 1 });
  return { db: drizzle(sql, { schema }), sql };
};
