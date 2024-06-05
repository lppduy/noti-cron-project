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
    field: 'timezone_id', // Tên cột trong cơ sở dữ liệu
    references: {
      model: 'timezones', // Tên bảng trong cơ sở dữ liệu
      key: 'id'
    }
  }
}, {
  tableName: 'users', // Tên bảng
  timestamps: true // Tự động tạo các trường createdAt và updatedAt
});

User.belongsTo(Timezone, { foreignKey: 'timezoneId' });

module.exports = User;
