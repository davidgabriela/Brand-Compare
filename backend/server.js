const express = require('express')
const axios = require('axios')

const app = express()

const HOST = '127.0.0.1'
const PORT = 3000
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
  console.log(response.data)
  return response.data.result
}

async function getProfileData() {
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
      id: '44596321012',
      profile_type: 'facebook_page',
      date: {
        start: 1608209422374,
        end: 1639745412436,
        timezone: 'Europe/London',
      },
    },
  }
  const response = await axios.post(URL, data, config)
  console.log(response.data)
  return response.data.result
}

getBrands()
getProfileData()

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
