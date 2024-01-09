import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getRatingAverage = (id) => {
  const request = axios.get(`${baseUrl}/${id}/rating`)
  return request.then((response) => response.data)
}

const create = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/rating`, newObject)
  return response.data
}

export default { getRatingAverage, create }