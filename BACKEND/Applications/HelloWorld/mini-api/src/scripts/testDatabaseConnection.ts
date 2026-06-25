import { closeConnectionPool, getConnectionPool } from "../config/database";

async function main(): Promise<void> {
  try {
    const pool = await getConnectionPool();

    console.log("Connexió establerta.");

    const result = await pool.request().query(`
      SELECT 
        DB_NAME() AS databaseName,
        @@VERSION AS sqlServerVersion;
    `);

    console.log(result.recordset[0]);
  } catch (error) {
    console.error("Error connecting to database:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await closeConnectionPool();
  }
}

main();