import axios from '../util/apiClient'
const baseUrl = '/api/users'

const login = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } 

const signup = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }
  
  export default { login, signup }