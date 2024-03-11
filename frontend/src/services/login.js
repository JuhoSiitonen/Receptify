import axios from '../util/apiClient'
const baseUrl = '/login'

const login = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } 

export default { login }