'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Descriptions', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'descriptions-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Descriptions', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'descriptions-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    }
};