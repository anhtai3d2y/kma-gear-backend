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
            Invoicedetails.belongsTo(models.Products)

        }
    };
    Invoicedetails.init({
        BillId: DataTypes.INTEGER,
        ProductId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        amount: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Invoicedetails',
    });
    return Invoicedetails;
};