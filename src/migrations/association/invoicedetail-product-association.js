'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Invoicedetails', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'invoicedetail-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Invoicedetails', {
            fields: ['productId'],
            type: 'foreign key',
            name: 'invoicedetail-product-association',
            references: {
                table: 'Products',
                field: 'id'
            }
        });
    }
};