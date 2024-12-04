// models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Adjust the path as necessary
    const Joblist = sequelize.define('Joblist', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      skillsRequired: {
        type: DataTypes.STRING, // You can also use ARRAY(DataTypes.STRING) for PostgreSQL
        allowNull: false,
      }
     
    },
    {
        tableName:"joblist",
      }

);
  
   Joblist.sync();

    module.exports = Joblist;
