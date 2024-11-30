const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_data', 'postgres', 'yisak', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;