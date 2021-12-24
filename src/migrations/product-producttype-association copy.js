'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Products', {
            fields: ['typeId'],
            type: 'foreign key',
            name: 'product-productype-association',
            references: {
                table: 'Producttypes',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Products', {
            fields: ['typeId'],
            type: 'foreign key',
            name: 'product-productype-association',
            references: {
                table: 'Producttypes',
                field: 'id'
            }
        });
    }
};