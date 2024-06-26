import axios from '../util/apiClient'
const baseUrl = '/api/recipies'

const getAll = async (query, length, favorites, subscribed) => {
  let filterQuery
  if (favorites) filterQuery = 'favorites=true'
  if (subscribed) filterQuery = 'subscribed=true'
  if (query !== '') {
    const response = await axios
      .get(`${baseUrl}/?${query}&length=${length}&${filterQuery}`)
    return response.data
  }
  const response = await axios
    .get(`${baseUrl}/?length=${length}&${filterQuery}`)
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

const search = async (ingredients) => {
  const response = await axios.post(`${baseUrl}/search`, { ingredients: ingredients })
  return response.data
}

const getUserRecipies = async () => {
  const response = await axios.get(`${baseUrl}/user`)
  return response.data
}

const getSingleRecipy = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAllIngredients = async () => {
  const response = await axios.get(`${baseUrl}/ingredients`)
  return response.data
}

export default { 
  getAll,  
  create, 
  update, 
  deleteRecipy, 
  search, 
  getUserRecipies,
  getSingleRecipy,
  getAllIngredients
 }
