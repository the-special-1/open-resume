// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Adjust the path as necessary

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: { // Optional if using Google Auth only
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: { // Role field for admin/user distinction
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
});

// Sync the model with the database (create table if it doesn't exist)
User.sync();

module.exports = User;