const axios = require('axios')

const API_KEY = 'API_KEY_TEST'
const URL = 'https://app.socialinsider.io/api'

async function getBrands() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  const data = {
    jsonrpc: '2.0',
    id: 0,
    method: 'socialinsider_api.get_brands',
    params: {
      projectname: 'API_test',
    },
  }
  const response = await axios.post(URL, data, config)
  return response.data.result
}

async function getProfileData(profileId, type, date) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  const data = {
    jsonrpc: '2.0',
    id: 0,
    method: 'socialinsider_api.get_profile_data',
    params: {
      id: profileId,
      profile_type: type,
      date,
    },
  }
  const response = await axios.post(URL, data, config)
  return response.data.resp[profileId]
}

module.exports = { getBrands, getProfileData }
