const express = require('express')
const axios = require('axios')

const app = express()

const HOST = '127.0.0.1'
const PORT = 3000
const API_KEY = 'API_KEY_TEST'
const URL = 'https://app.socialinsider.io/api'

async function getData() {
  let brandData = await getBrands()

  brandData.map((brand) => {
    const brandName = brand.brandname
    const brandProfiles = brand.profiles
    let totalFans = 0
    let totalEngagement = 0

    brandProfiles.map(async (profile) => {
      const profileId = profile.id
      const profileType = profile.profile_type
      const date = {
        start: 1608209422374,
        end: 1608299422374,
        timezone: 'Europe/London',
      }

      const profileData = await getProfileData(profileId, profileType, date)

      totalFans = Object.keys(profileData).reduce((total, key) => {
        if ('followers' in profileData[key])
          return total + profileData[key].followers
        else return total
      }, totalFans)

      totalEngagement = Object.keys(profileData).reduce((total, key) => {
        if ('engagement' in profileData[key])
          return total + profileData[key].engagement
        else return total
      }, totalEngagement)

      console.log(
        brandName,
        profileId,
        profileType,
        date,
        totalFans,
        totalEngagement,
        profileData,
        '\n\n',
      )
    })

    const data = {
      brandName,
      brandProfiles: brandProfiles.length,
      totalFans,
      totalEngagement,
    }

    console.log(data)
    return data
  })
  return brandData
}

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

// getBrands()
// getProfileData(44596321012, 'facebook_page', 1608209422374, 1639745412436)
getData()

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
