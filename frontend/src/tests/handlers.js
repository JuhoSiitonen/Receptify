import { http, HttpResponse, delay } from 'msw'

export const handlers = [
    http.get('/api/login', async () => {
      await delay(150)
      return HttpResponse.json('John Smith')
    })
  ]