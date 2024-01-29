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

beforeEach(async () => {
    await User.destroy({ where: {} })
    await User.bulkCreate(newUsers)
})

describe('GET /api/users', () => {
    test('returns all users', async () => {
        const response = await api.get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(newUsers.length)
    })
})

describe('POST /api/users', () => {
    test('creates a new user', async () => {
        const newUser = {
            "username": "new_user",
            "password": "password123",
            "admin": false,
            "visible": true
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(201)
        expect(response.body.username).toBe(newUser.username)
    })
})