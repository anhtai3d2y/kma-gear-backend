'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Bills', {
            fields: ['StateId'],
            type: 'foreign key',
            name: 'bills-state-association',
            references: {
                table: 'States',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Bills', {
            fields: ['StateId'],
            type: 'foreign key',
            name: 'bills-state-association',
            references: {
                table: 'States',
                field: 'id'
            }
        });
    }
};