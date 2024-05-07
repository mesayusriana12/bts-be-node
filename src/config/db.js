require('dotenv').config({ path: require('find-config')('.env') })

module.exports = {
  development: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};