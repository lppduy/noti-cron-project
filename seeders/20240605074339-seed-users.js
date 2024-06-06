'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        unlocked_video: 1,
        contact_id: 'contact1',
        timezone_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        unlocked_video: 1,
        contact_id: 'contact2',
        timezone_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jim Beam',
        email: 'jim.beam@example.com',
        phone_number: '1122334455',
        unlocked_video: 1,
        contact_id: 'contact3',
        timezone_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
