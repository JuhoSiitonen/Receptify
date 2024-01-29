const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User, Recipy, Ingredient, Category, RecipyIngredient, RecipyCategory } = require('../models')

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

const postableRecipies = [
    {
        "title": "Spaghetti Bolognese",
        "description": "Classic Italian pasta dish with rich tomato sauce.",
        "instructions": "Cook pasta, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 1,
        "ingredients": [
            {"name": "Spaghetti", "amount": "200g"},
            {"name": "Ground Beef", "amount": "500g"},
            {"name": "Tomato Sauce", "amount": "1 cup"}
        ],
        "categories": [
            {"name": "Italian"},
            {"name": "Pasta"}
        ]
    },
    {
        "title": "Chicken Tikka Masala",
        "description": "Classic Indian dish with chicken in a creamy tomato sauce.",
        "instructions": "Cook chicken, prepare sauce, mix, and serve.",
        "visible": true,
        "userId": 2,
        "ingredients": [
            {"name": "Chicken", "amount": "500g"},
            {"name": "Tomato Sauce", "amount": "1 cup"},
            {"name": "Cream", "amount": "1 cup"}
        ],
        "categories": [
            {"name": "Indian"},
            {"name": "Chicken"}
        ]
    },
]

beforeEach(async () => {
    await RecipyIngredient.destroy({ where: {} })
    await RecipyCategory.destroy({ where: {} })
    await Ingredient.destroy({ where: {} })
    await Category.destroy({ where: {} })
    await Recipy.destroy({ where: {} })
    await User.destroy({ where: {} })
    await User.bulkCreate(newUsers)
    let user = await User.findOne({ where: { username: "john_doe" } })
    postableRecipies[0].userId = user.id
    postableRecipies[1].userId = user.id
})

describe('GET /api/comments', () => {
    test('returns zero comments', async () => {
        const response = await api.get('/api/comments')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
    })
    test('returns one comment', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId,
            "recipyId": recipy.body.id
        }
        const response = await api.get('/api/comments')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})

describe('GET /api/comments/:id', () => {
    test('returns all comments for a recipe', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const response = await api.get(`/api/comments/${recipy.body.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
    })
})