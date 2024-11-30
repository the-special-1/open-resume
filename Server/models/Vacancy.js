const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Adjust the path as necessary

const Vacancy = sequelize.define('Resume', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    education: {
        type: DataTypes.JSONB, // Store education details as JSON
        allowNull: true,
    },
    work_experience: {
        type: DataTypes.JSONB, // Store work experience as JSON
        allowNull: true,
    },
    projects: {
        type: DataTypes.JSONB, // Store project details as JSON
        allowNull: true,
    },
    skills: {
        type: DataTypes.JSONB, // Store skills as JSON
        allowNull: true,
    },
});

// Sync the model with the database (create table if it doesn't exist)
Vacancy.sync();

module.exports = Vacancy;