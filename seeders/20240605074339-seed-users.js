'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { name: 'John Doe', email: 'john.doe@example.com', unlocked_video: 1, contact_id: 'contact1', timezone_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jane Smith', email: 'jane.smith@example.com', unlocked_video: 1, contact_id: 'contact2', timezone_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jim Beam', email: 'jim.beam@example.com', unlocked_video: 1, contact_id: 'contact3', timezone_id: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
