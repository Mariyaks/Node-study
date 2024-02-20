'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'localisation', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your requirements
      defaultValue: 'en',
    });
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.removeColumn('user', 'localisation');
  }
};
