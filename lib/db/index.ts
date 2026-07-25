import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// HTTP driver — ideal for serverless/edge one-shot queries (Server Components,
// Route Handlers, Server Actions). Uses the pooled connection string.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({ client: sql, schema });

export * from "./schema";
