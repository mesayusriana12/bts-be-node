require('dotenv').config({ path: require('find-config')('.env') });
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/db.js')[env];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging : env !== 'test' ? console.log : false
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.checklist = require('./checklist')(sequelize, Sequelize);
db.checklistItem = require('./checklistitem')(sequelize, Sequelize);

module.exports = db;