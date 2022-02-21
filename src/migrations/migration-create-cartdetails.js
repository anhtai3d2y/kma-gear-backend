'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cartdetails', {
            // CartId: DataTypes.INTEGER,
            // ProductId: DataTypes.INTEGER,
            // price: DataTypes.FLOAT,
            // amount: DataTypes.INTEGER,
            // discount: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            CartId: {
                type: Sequelize.INTEGER
            },
            ProductId: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.FLOAT
            },
            amount: {
                type: Sequelize.INTEGER
            },
            discount: {
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
        await queryInterface.dropTable('Cartdetails');
    }
};