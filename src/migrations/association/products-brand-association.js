'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Products', {
            fields: ['brandId'],
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
            fields: ['brandId'],
            type: 'foreign key',
            name: 'products-brand-association',
            references: {
                table: 'Brands',
                field: 'id'
            }
        });
    }
};