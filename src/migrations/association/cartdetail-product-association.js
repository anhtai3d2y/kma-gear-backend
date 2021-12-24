'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Cartdetails', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'cartdetail-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Cartdetails', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'cartdetail-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    }
};