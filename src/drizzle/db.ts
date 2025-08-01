// src/drizzle/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema/index";

config({ path: ".env" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
    export const db = drizzle({ client: sql, schema });
