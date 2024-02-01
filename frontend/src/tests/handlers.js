import { http, HttpResponse, delay } from 'msw'

const baseURL = process.env.REACT_APP_BACKEND_URL

export const handlers = [
    http.post(`/api/login`, async ({ request }) => {
      if (request.body.username !== 'John Doe' || request.body.password !== 'password') {
        return HttpResponse.status(401)
      }
      return HttpResponse.json({
        "id": 1,
        "username": "John Doe",
        "password": "password",
        "admin": false,
        "visible": true,
        "createdAt": "2024-02-01T14:12:04.268Z",
        "updatedAt": "2024-02-01T14:12:04.268Z"
      })
    })
  ]