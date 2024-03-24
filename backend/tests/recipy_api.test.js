const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')

beforeEach( async () => {
    await api.post('/api/testing/reset')
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
                    {"name": "Spaghetti", "amount": "200", "unit": "g"},
                    {"name": "Ground Beef", "amount": "500", "unit": "g"},
                    {"name": "Tomato Sauce", "amount": "1", "unit": "cup"}
                ],
                "categories": [
                    {"name": "Italian"},
                    {"name": "Pasta"}
                ],
                "cookingTime": "00:30",
                "pictureUuid": "1234-5678-91011"
        }
        const response = await api.post('/api/recipies').send(newRecipy)
        expect(response.status).toBe(500)
    })
})

describe('DELETE /api/recipies/:id', () => {
    test('is successfull', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        const response = await api.delete(`/api/recipies/${recipy.body.id}`)
        expect(response.status).toBe(204)
    })
    test('returns 404 if recipy is not found', async () => {
        const response = await api.delete('/api/recipies/9999')
        expect(response.status).toBe(404)
    })
})

describe('PUT /api/recipies/:id', () => {
    test('is successfull', async () => {
        const recipy = await api.post('/api/recipies').send(postableRecipies[0])
        postableRecipies[0].title = "New Title"
        const response = await api.put(`/api/recipies/${recipy.body.id}`).send(postableRecipies[0])
        expect(response.status).toBe(200)
        expect(response.body.title).toBe("New Title")
    })
    test('returns 404 if recipy is not found', async () => {
        const response = await api.put('/api/recipies/9999').send(postableRecipies[0])
        expect(response.status).toBe(404)
    })
})


