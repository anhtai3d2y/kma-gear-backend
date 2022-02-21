'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Bills', {
            fields: ['PaymentTypeId'],
            type: 'foreign key',
            name: 'bills-paymenttype-association',
            references: {
                table: 'paymenttypes',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Bills', {
            fields: ['PaymentTypeId'],
            type: 'foreign key',
            name: 'bills-paymenttype-association',
            references: {
                table: 'paymenttypes',
                field: 'id'
            }
        });
    }
};