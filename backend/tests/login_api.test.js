const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await api.post('/api/testing/reset')
    const password = await bcrypt.hash('password123', 10)
    newUsers[0].password = password
    newUsers[1].password = password
    newUsers[2].password = password
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