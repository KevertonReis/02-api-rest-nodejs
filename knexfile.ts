import { Knex } from "knex";


export const config: Knex.Config = {
  client: "sqlite3", // ou 'pg' para PostgreSQL
  connection: {
    filename: ".db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export default config;
