const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User, Recipy } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')

beforeEach(async () => {
    await api.post('/api/testing/reset')
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
