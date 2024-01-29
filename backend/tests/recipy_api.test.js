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

beforeEach( async () => {
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

describe('GET /api/recipies', () => {
    test('returns all recipies', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const response = await api.get('/api/recipies')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})

describe('POST /api/recipies', () => {
    test('creates a new recipy', async () => {
        const response = await api.post('/api/recipies').send(postableRecipies[0])
        expect(response.status).toBe(201)
        expect(response.body.title).toBe(postableRecipies[0].title)
    })
    test('returns 500 if title is missing', async () => {
        const recipyUser = await User.findOne({ where: { username: "john_doe" } })
        const newRecipy = {
                "description": "Classic Italian pasta dish with rich tomato sauce.",
                "instructions": "Cook pasta, prepare sauce, mix, and serve.",
                "visible": true,
                "userId": recipyUser.id,
                "ingredients": [
                    {"name": "Spaghetti", "amount": "200g"},
                    {"name": "Ground Beef", "amount": "500g"},
                    {"name": "Tomato Sauce", "amount": "1 cup"}
                ],
                "categories": [
                    {"name": "Italian"},
                    {"name": "Pasta"}
                ]
        }
        const response = await api.post('/api/recipies').send(newRecipy)
        expect(response.status).toBe(500)
    })
})

describe('DELETE /api/recipies/:id', () => {
    test('is successfull', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        console.log(recipy.body.id)
        const response = await api.delete(`/api/recipies/${recipy.body.id}`)
        expect(response.status).toBe(204)
    })
    test('returns 404 if recipy is not found', async () => {
        const response = await api.delete('/api/recipies/999')
        expect(response.status).toBe(404)
    })
})


