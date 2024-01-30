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
    await api.post('/api/testing/reset')
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
    test('returns 400 if username is not unique', async () => {
        const newUser = {
            "username": "john_doe",
            "password": "password123",
            "admin": false,
            "visible": true
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
    })
    test('returns 400 if username is missing', async () => {
        const newUser = {
            "password": "password123",
            "admin": false,
            "visible": true
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
    })
    test('returns 400 if password is missing', async () => {
        const newUser = {
            "username": "new_user",
            "admin": false,
            "visible": true
        }
        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
    })
})

describe('GET /api/users/:id', () => {
    test('returns a user', async () => {
        const user = await User.findOne({ where: { username: 'john_doe' } })
    const response = await api.get(`/api/users/${user.id}`)
        expect(response.status).toBe(200)
    })
    test('returns 404 if user is not found', async () => {
        const response = await api.get('/api/users/9999')
        expect(response.status).toBe(404)
    })
})
