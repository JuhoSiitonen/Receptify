import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
} 

export default { getAll, create }
