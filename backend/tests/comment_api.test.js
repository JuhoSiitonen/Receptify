const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')

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
        const response = await api.post(`/api/comments/${recipy.id}`).send(comment)
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