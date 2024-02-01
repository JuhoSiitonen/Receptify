globalThis.fetch = require('isomorphic-fetch');
import { server } from './src/tests/testServer.js'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
