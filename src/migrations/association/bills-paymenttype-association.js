'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Bills', {
            fields: ['paymentTypeId'],
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
            fields: ['paymentTypeId'],
            type: 'foreign key',
            name: 'bills-paymenttype-association',
            references: {
                table: 'paymenttypes',
                field: 'id'
            }
        });
    }
};