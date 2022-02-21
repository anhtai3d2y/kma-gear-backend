'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Producttypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Producttypes.belongsTo(models.Categorys)
            // Producttypes.hasMany(models.Products)
        }
    };
    Producttypes.init({
        typeName: DataTypes.STRING,
        CategoryId: DataTypes.INTEGER,
        deleted: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Producttypes',
    });
    return Producttypes;
};