import { http, HttpResponse } from 'msw'

const baseURL = process.env.REACT_APP_BACKEND_URL

export const handlers = [
    http.post(`${baseURL}/api/login`, async ({ request }) => {
      /*
      const newLogin = request.json()
      if (newLogin.username !== 'John Doe' || newLogin.password !== 'password') {
        return HttpResponse.status(401)
      }
      */
      return HttpResponse.json({
          "id": 462,
          "username": "John Doe",
          "admin": false,
          "subscriptions": [],
          "userFavorites": [],
          "rated": [],
          "shoppinglist": [],
          "email": false,
          "about": "",
          "subscribers": 0,
          "numberOfRecipes": 0
      }, { status: 201 })
    })
  ]