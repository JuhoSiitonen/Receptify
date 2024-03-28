import axios from '../util/apiClient'
const baseUrl = '/api/rating'

const getRatingAverage = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (id, rating) => {
  const response = await axios.post(`${baseUrl}/${id}`, rating)
  return response.data
}

const update = async (id, rating) => {
  const request = await axios.put(`${baseUrl}/${id}`, rating)
  return request.data
}

const deleteRating = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

export default { getRatingAverage, create, update, deleteRating }