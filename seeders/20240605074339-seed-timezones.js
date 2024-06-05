'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('timezones', [
      {
        name: 'America/New_York',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asia/Tokyo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Europe/London',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('timezones', null, {});
  }
};
