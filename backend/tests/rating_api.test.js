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
    await Comment.destroy({ where: {} })
    await Rating.destroy({ where: {} })
    await Recipy.destroy({ where: {} })
    await User.destroy({ where: {} })
    await User.bulkCreate(newUsers)
    let user = await User.findOne({ where: { username: "john_doe" } })
    postableRecipies[0].userId = user.id
    postableRecipies[1].userId = user.id
    await api.post('/api/recipies').send(postableRecipies[0])
})

describe('POST /api/rating/:id', () => {
    test('creates a new rating', async () => {
        const recipy = await Recipy.findOne({ where: { title: "Spaghetti Bolognese" } })
        const newRating = {
            "rating": 5,
            "userId": postableRecipies[1].userId
        }
        const response = await api.post(`/api/rating/${recipy.id}`).send(newRating)
        expect(response.status).toBe(201)
        expect(parseInt(response.body)).toBe(newRating.rating)
    })
    test('returns 404 if rating is missing', async () => {
        const newRating = {
            "userId": postableRecipies[1].userId
        }
        const response = await api.post('/api/rating/1').send(newRating)
        expect(response.status).toBe(404)
    })
    test('returns 404 if userId is missing', async () => {
        const recipy = await Recipy.findOne({ where: { title: "Spaghetti Bolognese" } })
        const newRating = {
            "rating": 5
        }
        const response = await api.post(`/api/rating/${recipy.id}`).send(newRating)
        expect(response.status).toBe(404)
    })
    test('returns 404 if recipe is not found', async () => {
        const newRating = {
            "rating": 5,
            "userId": postableRecipies[1].userId
        }
        const response = await api.post('/api/rating/9999').send(newRating)
        expect(response.status).toBe(404)
    })
    test('returns 404 if user is not found', async () => {
        const recipy = await Recipy.findOne({ where: { title: "Spaghetti Bolognese" } })
        const newRating = {
            "rating": 5,
            "userId": 9999
        }
        const response = await api.post(`/api/rating/${recipy.id}`).send(newRating)
        expect(response.status).toBe(404)
    })
})
