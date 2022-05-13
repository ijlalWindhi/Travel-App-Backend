'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penumpang', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      username: {
        type: Sequelize.STRING(255),
      },
      nama: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      telp: {
        type: Sequelize.STRING(255)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('penumpang');
  }
};