'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Descriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Descriptions.belongsTo(models.Products)
      models.Products.hasMany(Descriptions)
    }
  };
  Descriptions.init({
    ProductId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Descriptions',
  });
  return Descriptions;
};