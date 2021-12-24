'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Invoicedetails', {
            fields: ['billId'],
            type: 'foreign key',
            name: 'invoicedetail-bill-association',
            references: {
                table: 'Bills',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Invoicedetails', {
            fields: ['billId'],
            type: 'foreign key',
            name: 'invoicedetail-bill-association',
            references: {
                table: 'Bills',
                field: 'id'
            }
        });
    }
};