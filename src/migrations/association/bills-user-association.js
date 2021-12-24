'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Bills', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'bills-user-association',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Bills', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'bills-user-association',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    }
};