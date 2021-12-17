'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cartdetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Cartdetail.init({
        cartId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        amount: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cartdetail',
    });
    return Cartdetail;
};