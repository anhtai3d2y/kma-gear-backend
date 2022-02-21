'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Cartdetails', {
            fields: ['CartId'],
            type: 'foreign key',
            name: 'cartdetail-cart-association',
            references: {
                table: 'Carts',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Cartdetails', {
            fields: ['CartId'],
            type: 'foreign key',
            name: 'cartdetail-cart-association',
            references: {
                table: 'Carts',
                field: 'id'
            }
        });
    }
};