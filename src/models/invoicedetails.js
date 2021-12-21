'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoicedetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Invoicedetails.belongsTo(models.Bills)
            models.Bills.hasMany(Invoicedetails)
            Invoicedetails.belongsTo(models.Products)
            models.Products.hasMany(Invoicedetails)
        }
    };
    Invoicedetails.init({
        billId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        amount: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Invoicedetails',
    });
    return Invoicedetails;
};