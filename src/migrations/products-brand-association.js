'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Products', {
            fields: ['BrandId'],
            type: 'foreign key',
            name: 'products-brand-association',
            references: {
                table: 'Brands',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Products', {
            fields: ['BrandId'],
            type: 'foreign key',
            name: 'products-brand-association',
            references: {
                table: 'Brands',
                field: 'id'
            }
        });
    }
};