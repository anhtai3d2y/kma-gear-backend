'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cartdetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cartdetails.belongsTo(models.Products)
            models.Products.hasMany(Cartdetails)
            Cartdetails.belongsTo(models.Carts)
            models.Carts.hasMany(Cartdetails)
        }
    };
    Cartdetails.init({
        cartId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        amount: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cartdetails',
    });
    return Cartdetails;
};