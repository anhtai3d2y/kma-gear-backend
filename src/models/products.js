'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.belongsTo(models.Brands)
            // Products.belongsTo(models.Producttypes)
            Products.hasMany(models.Invoicedetails)
            Products.hasMany(models.Cartdetails)
        }
    };
    Products.init({
        name: DataTypes.STRING,
        brandId: DataTypes.INTEGER,
        typeId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        discount: DataTypes.INTEGER,
        image: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        deleted: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};