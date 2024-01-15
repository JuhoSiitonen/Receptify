import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getRatingAverage = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/rating`)
  return response.data
}

const create = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/rating`, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}/rating`, newObject)
  return request.data
}

const deleteRating = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}/rating`)
  return request.data
}

export default { getRatingAverage, create, update, deleteRating }