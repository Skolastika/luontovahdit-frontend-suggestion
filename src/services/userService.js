import axios from 'axios'

const getProfile = async (credentials) => {
  const response = await axios.get('/profile/get', credentials)
  return response.data
}

export default { getProfile }