const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')

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
    await api.post('/api/testing/reset')
    await User.bulkCreate(newUsers)
    let user = await User.findOne({ where: { username: "john_doe" } })
    postableRecipies[0].userId = user.id
    postableRecipies[1].userId = user.id
})

describe('POST /api/comments/:id', () => {
    test('creates a new comment', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        const response = await api.post(`/api/comments/${recipy.body.id}`).send(comment)
        expect(response.status).toBe(201)
        expect(response.body.comment).toBe(comment.content)
    })
    test('returns 500 if content is missing', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const comment = {
            "userId": postableRecipies[1].userId
        }
        const response = await api.post(`/api/comments/${recipy.body.id}`).send(comment)
        expect(response.status).toBe(500)
    })
    test('returns 404 if recipy is not found', async () => {
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        const response = await api.post(`/api/comments/9999`).send(comment)
        expect(response.status).toBe(404)
    })
})

describe('GET /api/comments/:id', () => {
    test('returns all comments for a recipe', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        await api.post(`/api/comments/${recipy.body.id}`).send(comment)
        const response = await api.get(`/api/comments/${recipy.body.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})