'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            // name: DataTypes.STRING,
            // BrandId: DataTypes.INTEGER,
            // TypeId: DataTypes.INTEGER,
            // amount: DataTypes.INTEGER,
            // price: DataTypes.FLOAT,
            // discount: DataTypes.INTEGER,
            // image: DataTypes.STRING,
            // shortDescHTML: DataTypes.TEXT('long'),
            // shortDescMarkdown: DataTypes.TEXT('long'),
            // descriptionHTML: DataTypes.TEXT('long'),
            // descriptionMarkdown: DataTypes.TEXT('long'),
            // deleted: DataTypes.INTEGER

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            BrandId: {
                type: Sequelize.INTEGER
            },
            TypeId: {
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
            shortDescHTML: {
                type: Sequelize.TEXT('long')
            },
            shortDescMarkdown: {
                type: Sequelize.TEXT('long')
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Products');
    }
};