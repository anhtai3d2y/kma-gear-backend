'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.hasMany(models.Cartdetails)
      Carts.belongsTo(models.Users)
    }
  };
  Carts.init({
    UserId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.TEXT,
    PaymenttypeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};