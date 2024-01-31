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
    const request = await axios.get(`${baseUrl}/session`)
    console.log('session', request.data)
    return request.data
  }
  
  export default { signup, deleteUser, logoutUser, session }