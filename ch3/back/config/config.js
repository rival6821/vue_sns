const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "ilhoon",
    password: process.env.LOCAL_DB_PASSWORD,
    database: "vue-sns",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00"
  }
};
