'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transportasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: 'id_transportasi',
        as: 'pemesanan'
      });
    }
  }
  transportasi.init({
    jenis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    harga: DataTypes.INTEGER,
    ruteAwal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ruteAkhir: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transportasi',
    modelName: 'transportasi',
    timestamps: false
  });
  return transportasi;
};