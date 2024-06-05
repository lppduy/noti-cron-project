const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const Timezone = require('./Timezone');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  unlockedVideo: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'unlocked_video'
  },
  contactId: {
    type: DataTypes.STRING,
    defaultValue: '',
    field: 'contact_id'
  },
  timezoneId: {
    type: DataTypes.INTEGER,
    field: 'timezone_id',
    references: {
      model: 'timezones',
      key: 'id'
    }
  }
}, {
  tableName: 'users',
  timestamps: true
});

User.belongsTo(Timezone, { foreignKey: 'timezoneId' });

module.exports = User;
