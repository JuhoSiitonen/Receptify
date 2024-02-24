import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getAll = async (query) => {
  if (query !== '') {
    const response = await axios.get(`${baseUrl}/?${query}`)
    return response.data
  }
  const response = await axios.get(baseUrl)
  return response.data
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
