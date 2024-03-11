import axios from '../util/apiClient'
const baseUrl = '/api/login'

const login = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } 

export default { login }