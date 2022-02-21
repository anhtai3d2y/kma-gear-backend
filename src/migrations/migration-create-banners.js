'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Banners', {
            // link: DataTypes.STRING,
            // image: DataTypes.STRING,
            // type: DataTypes.INTEGER,
            // deleted: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            link: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            type: {
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
        await queryInterface.dropTable('Banners');
    }
};