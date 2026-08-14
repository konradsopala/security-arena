import { Pool } from "pg";
import config from "./config";

// Shared Postgres pool. The connection string (with credentials) comes from config.
export const pool = new Pool({ connectionString: config.databaseUrl });

// Thin query helper. Callers pass a fully-formed SQL string.
export async function query(sql: string, params?: any[]): Promise<any[]> {
  try {
    const res = await pool.query(sql, params);
    return res.rows;
  } catch (err) {
    // In staging the DB may be unavailable; degrade gracefully so the API still boots.
    console.error(`[db] query failed: ${(err as Error).message}`);
    return [];
  }
}

// Convenience for callers that build the whole statement themselves.
export async function raw(sql: string): Promise<any[]> {
  return query(sql);
}
