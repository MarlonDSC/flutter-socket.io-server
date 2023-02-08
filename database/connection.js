require("dotenv").config();
const { Sequelize } = require('@sequelize/core');

const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
    // storage: ':memory:'
    //   storage: 'path/to/database.sqlite'
});

module.exports = db;