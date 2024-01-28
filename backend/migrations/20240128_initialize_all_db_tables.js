const { DataTypes } = require('sequelize')

module.exports = { 
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {

        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
    }
}