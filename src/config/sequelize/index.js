const Sequelize = require('sequelize');
const initModels = require("../../app/models/init-models");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // dialectOptions: {
    //     socketPath: process.env.DB_HOST
    // },
});

module.exports = {
    sequelize,
    models: initModels(sequelize),
};