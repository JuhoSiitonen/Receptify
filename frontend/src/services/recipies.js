import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }
