'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Producttypes', {
            // typeName: DataTypes.STRING,
            // categoryId: DataTypes.INTEGER,
            // deleted: DataTypes.INTEGER,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            typeName: {
                type: Sequelize.STRING
            },
            CategoryId: {
                type: Sequelize.INTEGER
            },
            deleted: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Producttypes');
    }
};