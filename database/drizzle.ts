import config from "@/lib/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sgl = neon(config.env.databaseUrl || "defaultDatabaseUrl");
export const db = drizzle({ client: sgl });
