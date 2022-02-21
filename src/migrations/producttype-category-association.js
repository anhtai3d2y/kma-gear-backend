'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Producttypes', {
            fields: ['CategoryId'],
            type: 'foreign key',
            name: 'producttype-category-association',
            references: {
                table: 'Categorys',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Producttypes', {
            fields: ['CategoryId'],
            type: 'foreign key',
            name: 'producttype-category-association',
            references: {
                table: 'Categorys',
                field: 'id'
            }
        });
    }
};