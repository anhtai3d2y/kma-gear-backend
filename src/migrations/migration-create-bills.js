'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bills', {
            // userId: DataTypes.INTEGER,
            // fullName: DataTypes.STRING,
            // email: DataTypes.STRING,
            // phoneNumber: DataTypes.STRING,
            // address: DataTypes.STRING,
            // note: DataTypes.TEXT,
            // statusId: DataTypes.INTEGER,
            // paymentTypeId: DataTypes.INTEGER,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
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
            stateId: {
                type: Sequelize.INTEGER
            },
            paymentTypeId: {
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
        await queryInterface.dropTable('bills');
    }
};