const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
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
})

describe('GET /api/recipies', () => {
  test('returns all recipies', async () => {
    const recipy = await api
      .post('/api/recipies')
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    const response = await api
      .get('/api/recipies')
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
})

describe('POST /api/recipies', () => {
  test('creates a new recipy', async () => {
    const response = await api
      .post('/api/recipies')
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(201)
    expect(response.body.title).toBe(postableRecipies[0].title)
  })
  test('returns 500 if title is missing', async () => {
    const recipyUser = await User.findOne({ where: { username: 'john_doe' } })
    const newRecipy = {
      description: 'Classic Italian pasta dish with rich tomato sauce.',
      instructions: 'Cook pasta, prepare sauce, mix, and serve.',
      visible: true,
      userId: recipyUser.id,
      ingredients: [
        { name: 'Spaghetti', amount: '200', unit: 'g' },
        { name: 'Ground Beef', amount: '500', unit: 'g' },
        { name: 'Tomato Sauce', amount: '1', unit: 'cup' }
      ],
      categories: [
        { name: 'Italian' },
        { name: 'Pasta' }
      ],
      cookingTime: '00:30',
      pictureUuid: '1234-5678-91011'
    }
    const response = await api
      .post('/api/recipies')
      .send(newRecipy)
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(500)
  })
})

describe('DELETE /api/recipies/:id', () => {
  test('is successfull', async () => {
    const recipy = await api
      .post('/api/recipies')
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    const response = await api
      .delete(`/api/recipies/${recipy.body.id}`)
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(204)
  })
  test('returns 404 if recipy is not found', async () => {
    const response = await api
      .delete('/api/recipies/9999')
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(404)
  })
})

describe('PUT /api/recipies/:id', () => {
  test('is successfull', async () => {
    const recipy = await api
      .post('/api/recipies')
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    postableRecipies[0].title = 'New Title'
    const response = await api
      .put(`/api/recipies/${recipy.body.id}`)
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(200)
    expect(response.body.title).toBe('New Title')
  })
  test('returns 404 if recipy is not found', async () => {
    const response = await api
      .put('/api/recipies/9999')
      .send(postableRecipies[0])
      .set('Cookie', sessionCookie)
    expect(response.status).toBe(404)
  })
})
