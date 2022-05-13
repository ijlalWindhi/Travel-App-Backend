'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penumpang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: 'id_penumpang',
        as: 'pemesanan'
      });
    }
  }
  penumpang.init({
    username: {
      type : DataTypes.STRING,
      allowNull: false
    },
    nama: {
      type : DataTypes.STRING,
      allowNull: false
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false
    },
    telp: {
      type : DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'penumpang',
    modelName: 'penumpang',
    timestamps: false

  });
  return penumpang;
};