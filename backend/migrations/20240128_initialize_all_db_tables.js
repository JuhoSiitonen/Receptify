const { DataTypes } = require('sequelize')

module.exports = { 
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            username: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
              },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        })
        await queryInterface.createTable('recipies', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            instructions: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            average_rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
              },
            cooking_time: {
                type: DataTypes.TIME,
                allowNull: false,
              },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                  },
              },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            picture_uuid: {
                type: DataTypes.TEXT,
            },
        })
        await queryInterface.createTable('subscriptions', {
          subscriber_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
          },
          publisher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
          },
        })
        await queryInterface.createTable('favorites', {
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
          },
          recipy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recipies',
                key: 'id',
            },
          }
        })
        await queryInterface.createTable('ingredients', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            name: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
              },
        })
        await queryInterface.createTable('categories', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            name: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
              },
        })
        await queryInterface.createTable('recipy_ingredients', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            amount: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            unit: {
                type: DataTypes.TEXT,
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            recipy_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipies',
                    key: 'id',
                  },
              },
            ingredient_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ingredients',
                    key: 'id',
                  },
              },
        })
        await queryInterface.createTable('recipy_categories', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            recipy_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipies',
                    key: 'id',
                  },
              },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id',
                  },
              },
        })
        await queryInterface.createTable('comments', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                  },
              },
            recipy_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipies',
                    key: 'id',
                  },
              },
        })
        await queryInterface.createTable('ratings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
              },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
              },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                  },
              },
            recipy_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipies',
                    key: 'id',
                  },
              },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('recipies')
        await queryInterface.dropTable('ingredients')
        await queryInterface.dropTable('categories')
        await queryInterface.dropTable('recipy_ingredients')
        await queryInterface.dropTable('recipy_categories')
        await queryInterface.dropTable('comments')
        await queryInterface.dropTable('ratings')
        await queryInterface.dropTable('subscriptions')
        await queryInterface.dropTable('favorites')
      }
}