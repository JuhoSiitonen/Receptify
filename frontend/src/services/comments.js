import axios from 'axios'
const baseUrl = '/api/recipies'

const getAllComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then((response) => response.data)
}

const create = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

export default { getAllComments, create }