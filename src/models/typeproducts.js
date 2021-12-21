'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Typeproducts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Typeproducts.belongsTo(models.Categorys)
            models.Categorys.hasMany(Typeproducts)
        }
    };
    Typeproducts.init({
        typeName: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Typeproducts',
    });
    return Typeproducts;
};