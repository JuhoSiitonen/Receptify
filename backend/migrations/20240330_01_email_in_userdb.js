const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'email', {
      type: DataTypes.TEXT,
      allowNull: true
    })
    await queryInterface.addColumn('users', 'about', {
      type: DataTypes.TEXT,
      allowNull: true
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'email')
    await queryInterface.removeColumn('users', 'about')
  }
}
