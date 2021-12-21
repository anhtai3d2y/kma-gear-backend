'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('Typeproducts', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'typeproducts-category-association',
            references: {
                table: 'Categorys',
                field: 'id'
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('Typeproducts', {
            fields: ['categoryId'],
            type: 'foreign key',
            name: 'typeproducts-category-association',
            references: {
                table: 'Categorys',
                field: 'id'
            }
        });
    }
};