'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Paymenttypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Paymenttypes.hasMany(models.Bills)
        }
    };
    Paymenttypes.init({
        content: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Paymenttypes',
    });
    return Paymenttypes;
};