import "dotenv/config";
import sql from "mssql";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const databaseConfig: sql.config = {
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  server: getRequiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT ?? 1433),
  database: getRequiredEnv("DB_NAME"),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true"
  }
};

let pool: sql.ConnectionPool | null = null;

export async function getConnectionPool(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool;
  }

  pool = await sql.connect(databaseConfig);
  return pool;
}

export async function closeConnectionPool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

export { sql };