import axios from 'axios'

let apiClient

if (process.env.NODE_ENV === 'development') {
  apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  })
} else {
  apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
})
}

export default apiClient