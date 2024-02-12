import axios from '../util/apiClient'
const baseUrl = '/api/users'

const signup = async newObject => {
    const newUser = {
      username: newObject.username,
      password: newObject.password,
      admin: false,
      visible: true
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
 
  const addFriend = async (id) => {
    const request = await axios.post(`${baseUrl}/friends/${id}`)
    return request.data
  }

  const deleteFriend = async (id) => {
    const request = await axios.delete(`${baseUrl}/friends/${id}`)
    return request.data
  }

  const getUserInfo = async (id) => {
    const request = await axios.get(`${baseUrl}/userinfo/${id}`)
    return request.data
  }

  export default { signup, deleteUser, logoutUser, session, getUserRecipies, addFriend, deleteFriend, getUserInfo }