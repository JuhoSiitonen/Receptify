const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')
const bcrypt = require('bcrypt')

let sessionCookie;

beforeEach(async () => {
    await api.post('/api/testing/reset')
    const password = await bcrypt.hash('password123', 10)
    newUsers[0].password = password
    newUsers[1].password = password
    newUsers[2].password = password
    await User.bulkCreate(newUsers)
    const loginResponse = await api.post('/api/login').send({ username: 'john_doe', password: 'password123' });
    const rawCookies = loginResponse.headers['set-cookie'];
    sessionCookie = rawCookies.map(cookie => cookie.split(';')[0]).join(';');
    let user = await User.findOne({ where: { username: "john_doe" } });
    postableRecipies[0].userId = user.id
    postableRecipies[1].userId = user.id
})

describe('POST /api/comments/:id', () => {
    test('creates a new comment', async () => {
        const recipy = await api
        .post('/api/recipies')
        .send(postableRecipies[0])
        .set('Cookie', sessionCookie);
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        const response = await api
        .post(`/api/comments/${recipy.body.id}`)
        .send(comment)
        .set('Cookie', sessionCookie);
        expect(response.status).toBe(201)
        expect(response.body.comment).toBe(comment.content)
    })
    test('returns 500 if content is missing', async () => {
        const recipy = await api
        .post('/api/recipies')
        .send(postableRecipies[0])
        .set('Cookie', sessionCookie);
        const comment = {
            "userId": postableRecipies[1].userId
        }
        const response = await api
        .post(`/api/comments/${recipy.body.id}`)
        .send(comment)
        .set('Cookie', sessionCookie);
        expect(response.status).toBe(500)
    })
    test('returns 404 if recipy is not found', async () => {
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        const response = await api
        .post(`/api/comments/9999`)
        .send(comment)
        .set('Cookie', sessionCookie);
        expect(response.status).toBe(404)
    })
})

describe('GET /api/comments/:id', () => {
    test('returns all comments for a recipe', async () => {
        const recipy = await api
        .post('/api/recipies')
        .send(postableRecipies[0])
        .set('Cookie', sessionCookie);
        const comment = {
            "content": "This is a comment",
            "userId": postableRecipies[1].userId
        }
        await api
        .post(`/api/comments/${recipy.body.id}`)
        .send(comment)
        .set('Cookie', sessionCookie);
        const response = await api
        .get(`/api/comments/${recipy.body.id}`)
        .set('Cookie', sessionCookie);
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})