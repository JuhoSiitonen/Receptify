const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { newUsers } = require('../utils/test_helpers')
const { postableRecipies } = require('../utils/test_helpers')


let sessionCookie;

beforeAll(async () => {
  await api.post('/api/testing/reset')
  await User.bulkCreate(newUsers)
  const loginResponse = await api.post('/api/login').send({ username: 'john_doe', password: 'password123' });
  const rawCookies = loginResponse.headers['set-cookie'];
  sessionCookie = rawCookies.map(cookie => cookie.split(';')[0]).join(';');
});

test('make a request with session ID', async () => {
  const response = await api
    .get('/api/recipies')
    .set('Cookie', sessionCookie);
  expect(response.status).toBe(200)

});