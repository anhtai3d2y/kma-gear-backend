'use strict';
const {
    Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bills extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Bills.belongsTo(models.States)
            Bills.belongsTo(models.Paymenttypes)
            Bills.belongsTo(models.Users)
            Bills.hasMany(models.Invoicedetails)
        }
    };
    Bills.init({
        UserId: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        note: DataTypes.TEXT,
        StateId: DataTypes.INTEGER,
        PaymenttypeId: DataTypes.INTEGER,
        payId: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        deleted: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Bills',
    });
    return Bills;
};