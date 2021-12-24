'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            // name: DataTypes.STRING,
            // brandId: DataTypes.INTEGER,
            // typeId: DataTypes.INTEGER,
            // amount: DataTypes.INTEGER,
            // price: DataTypes.FLOAT,
            // discount: DataTypes.INTEGER,
            // image: DataTypes.STRING,
            // descriptionHTML: DataTypes.TEXT('long'),
            // descriptionMarkdown: DataTypes.TEXT('long')
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            brandId: {
                type: Sequelize.INTEGER
            },
            typeId: {
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.FLOAT
            },
            discount: {
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('products');
    }
};