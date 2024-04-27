const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User, Recipy } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')
const bcrypt = require('bcrypt')

let sessionCookie

beforeEach(async () => {
  await api.post('/api/testing/reset')
  const password = await bcrypt.hash('password123', 10)
  newUsers[0].password = password
  newUsers[1].password = password
  newUsers[2].password = password
  await User.bulkCreate(newUsers)
  const loginResponse = await api.post('/api/login').send({ username: 'john_doe', password: 'password123' })
  const rawCookies = loginResponse.headers['set-cookie']
  sessionCookie = rawCookies.map(cookie => cookie.split(';')[0]).join(';')
  const user = await User.findOne({ where: { username: 'john_doe' } })
  postableRecipies[0].userId = user.id
  postableRecipies[1].userId = user.id
  await api
    .post('/api/recipies')
    .send(postableRecipies[0])
    .set('Cookie', sessionCookie)
})

describe('POST /api/rating/:id', () => {
  test('creates a new rating', async () => {
    const recipy = await Recipy.findOne({ where: { title: 'Spaghetti Bolognese' } })
    const newRating = {
      rating: 5,
      userId: postableRecipies[1].userId
    }
    const response = await api
      .post(`/api/rating/${recipy.id}`)
      .send(newRating)
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(201)
    expect(parseInt(response.body)).toBe(newRating.rating)
  })
  test('returns 404 if rating is missing', async () => {
    const newRating = {
      userId: postableRecipies[1].userId
    }
    const response = await api
      .post('/api/rating/1')
      .send(newRating)
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(404)
  })
  test('returns 404 if recipe is not found', async () => {
    const newRating = {
      rating: 5,
      userId: postableRecipies[1].userId
    }
    const response = await api
      .post('/api/rating/9999')
      .send(newRating)
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(404)
  })
})
