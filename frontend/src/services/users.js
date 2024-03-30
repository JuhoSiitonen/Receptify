import axios from '../util/apiClient'
const baseUrl = '/api/users'

const signup = async newObject => {
    const newUser = {
      username: newObject.username,
      password: newObject.password,
    }
    const response = await axios.post(baseUrl, newUser)
    return response.data
  }

  const deleteUser = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    return request.data
  }

  const logoutUser = async () => {
    const request = await axios.post(`${baseUrl}/logout`)
    return request.data
  }

  const session = async () => {
    const response = await axios.get(`${baseUrl}/session`)
    return response.data
  }

  const getUserRecipies = (id) => {
    const request = axios.get(`${baseUrl}/${id}/view`)
    return request.then(response => response.data)
  }
 
  const addSubscription = async (id) => {
    const response = await axios.post(`${baseUrl}/subscriptions/${id}`)
    return response.data
  }

  const deleteSubscription = async (id) => {
    const request = await axios.delete(`${baseUrl}/subscriptions/${id}`)
    return request.data
  }

  const getUserInfo = async (id) => {
    const request = await axios.get(`${baseUrl}/userinfo/${id}`)
    return request.data
  }

  const addFavorite = async (id) => {
    const response = await axios.post(`${baseUrl}/favorites/${id}`)
    return response.data
  }

  const deleteFavorite = async (id) => {
    const request = await axios.delete(`${baseUrl}/favorites/${id}`)
    return request.data
  }

  const addShoppinglistItem = async (items) => {
    const response = await axios.post(`${baseUrl}/shoppinglist`, items)
    return response.data
  }

  const deleteShoppinglistItem = async (id) => {
    const request = await axios.delete(`${baseUrl}/shoppinglist/${id}`)
    return request.data
  }

  const sendShoppinglist = async (items) => {
    const response = await axios.post(`${baseUrl}/shoppinglist/email`, items)
    return response.data
  }

  const editAbout = async (info) => {
    const response = await axios.put(`${baseUrl}/about`, info)
    return response.data
  }

  const editEmail = async (email) => {
    const response = await axios.put(`${baseUrl}/email`, email)
    return response.data
  }

  export default { 
    signup, 
    deleteUser, 
    logoutUser, 
    session, 
    getUserRecipies, 
    addSubscription, 
    deleteSubscription, 
    getUserInfo,
    addFavorite,
    deleteFavorite,
    addShoppinglistItem,
    deleteShoppinglistItem,
    sendShoppinglist,
    editAbout,
    editEmail
  }