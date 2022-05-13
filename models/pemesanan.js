'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.penumpang, {
        foreignKey: 'id',
      }),
      this.hasMany(models.transportasi, {
        foreignKey: 'id',
      });
    }
  }
  pemesanan.init({
    tanggal_keberangkatan: DataTypes.DATE,
    nama: DataTypes.STRING,
    pembayaran: DataTypes.STRING,
    kursi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanan',
    timestamps: false
  });
  return pemesanan;
};