const Sequelize = require("sequelize");

/**
 * NB: Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, 
 * and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.
 * https://sequelize.org/
 */

const sequelize = new Sequelize(
  "odiben",
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DOMAIN,
    dialect: "mysql",
  }
);

sequelize.authenticate().catch(err=>console.log(err.message));

module.exports = sequelize;