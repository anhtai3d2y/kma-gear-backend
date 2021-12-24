'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Carts', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'cart-user-association',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Carts', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'cart-user-association',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    }
};