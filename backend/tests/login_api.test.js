const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User, Recipy, Ingredient, Category, RecipyIngredient, RecipyCategory, Comment, Rating } = require('../models')

const newUsers = [
    {
        "username": "john_doe",
        "password": "password123",
        "admin": false,
        "visible": true
    },
    {
        "username": "jane_doe",
        "password": "password123",
        "admin": false,
        "visible": true
    },
    {
        "username": "admin_doe",
        "password": "password123",
        "admin": true,
        "visible": true
    },
]

beforeEach(async () => {
    await RecipyIngredient.destroy({ where: {} })
    await RecipyCategory.destroy({ where: {} })
    await Ingredient.destroy({ where: {} })
    await Category.destroy({ where: {} })
    await Comment.destroy({ where: {} })
    await Rating.destroy({ where: {} })
    await Recipy.destroy({ where: {} })
    await User.destroy({ where: {} })
    await User.bulkCreate(newUsers)
})

describe('POST /api/login', () => {
    test('login is successfull with correct credentials', async () => {
        const credentials = {
            "username": "john_doe",
            "password": "password123"
        }
        const response = await api.post('/api/login').send(credentials)
        expect(response.status).toBe(200)
    })
    test('login fails with incorrect credentials', async () => {
        const credentials = {
            "username": "john_doe",
            "password": "wrong_password"
        }
        const response = await api.post('/api/login').send(credentials)
        expect(response.status).toBe(401)
    })
})