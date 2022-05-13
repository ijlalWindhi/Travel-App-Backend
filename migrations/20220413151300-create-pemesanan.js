'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      id_transportasi: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'transportasi',
          key: 'id'
      }},
      kursi: {
        type: Sequelize.STRING(255)
      },
      pembayaran: {
        type: Sequelize.STRING(255)
      },
      nama: {
        type: Sequelize.STRING(255),
      },
      tanggal_keberangkatan: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pemesanan');
  }
};