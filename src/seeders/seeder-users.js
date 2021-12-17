'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'anhtai3d2y@gmail.com',
      password: 'anhtai3d2y',
      fullName: 'Pham Duy Tai',
      phoneNumber: '0932062686',
      address: 'Hưng Yên',
      roleId: 'ROLE',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
