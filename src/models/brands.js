'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brands extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Brands.hasMany(models.Products)
        }
    };
    Brands.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        deleted: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Brands',
    });
    return Brands;
};