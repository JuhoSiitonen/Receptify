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

export default { getRatingAverage, create }