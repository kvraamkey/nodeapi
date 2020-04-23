// Update with your config settings.

const migrationTableName = "migrations";
const migrationsDirectory = "./src/database/migrations";
const migrationsSeeds = "./src/database/seeds";

const connection = {
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD
};

const pool = {
  min: 2,
  max: 10
};

const migrations = {
  tableName: migrationTableName,
  directory: migrationsDirectory
};

const seeds = {
  directory: migrationsSeeds
};

module.exports = {

  development: {
    client: 'mysql',
    connection, pool,
    migrations, seeds
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  production: {
    client: 'postgresql',
    connection, pool,
    migrations, seeds
  }

};
