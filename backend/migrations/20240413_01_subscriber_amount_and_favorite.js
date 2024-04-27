const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'subscribers', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    await queryInterface.addColumn('users', 'number_of_recipes', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    await queryInterface.addColumn('recipies', 'favorites', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'subscribers')
    await queryInterface.removeColumn('users', 'number_of_recipes')
    await queryInterface.removeColumn('recipies', 'favorites')
  }
}
