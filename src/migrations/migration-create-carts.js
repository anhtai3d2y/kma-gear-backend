'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Carts', {
            // UserId: DataTypes.INTEGER,
            // fullName: DataTypes.STRING,
            // email: DataTypes.STRING,
            // phoneNumber: DataTypes.STRING,
            // address: DataTypes.STRING,
            // note: DataTypes.TEXT,
            // PaymenttypeId: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            UserId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
            },
            PaymenttypeId: {
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
        await queryInterface.dropTable('Carts');
    }
};