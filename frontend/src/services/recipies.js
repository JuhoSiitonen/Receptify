import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getAll = async (query) => {
  if (query) {
    const request = await axios.get(`${baseUrl}/?${query}`)
    return request.data
  }
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
} 

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const deleteRecipy = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

export default { getAll, create, update, deleteRecipy }
