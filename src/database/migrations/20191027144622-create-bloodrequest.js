'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bloodrequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requesterId: {
        type: Sequelize.INTEGER
      },
      bloodGroup: {
        type: Sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      },
      hospitalId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('pending', 'matched', 'reprocessing', 'failed', 'success')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bloodrequests');
  }
};