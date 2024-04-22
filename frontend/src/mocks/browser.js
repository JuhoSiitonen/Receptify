import { setupWorker } from 'msw/browser'
import { handlers } from '../tests/handlers'
 
export const worker = setupWorker(...handlers)

