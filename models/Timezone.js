const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Timezone = sequelize.define('Timezone', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'timezones',
  timestamps: true
});

module.exports = Timezone;
