const express = require('express')
const axios = require('axios')

const app = express()

const HOST = '127.0.0.1'
const PORT = 3000
const API_KEY = 'API_KEY_TEST'
const URL = 'https://app.socialinsider.io/api'

async function getData() {
  let brandData = await getBrands()

  brandData.map(async (brand) => {
    const brandName = brand.brandname
    const brandProfiles = brand.profiles

    let totalFans = 0
    let totalEngagement = 0

    const START = 1608209422374
    const END = 1608299422374

    await Promise.all(
      brandProfiles.map(async (profile) => {
        const profileId = profile.id
        const profileType = profile.profile_type
        const date = {
          start: START,
          end: END,
          timezone: 'Europe/London',
        }

        const profileData = await getProfileData(profileId, profileType, date)
        let days = Object.keys(profileData)

        // Keep only the entries from the date range
        days = days.filter((day) => {
          const dayDate = new Date(day.split('-').reverse().join('-'))
          const startDate = new Date(START)
          const endDate = new Date(END)

          dayDate.setHours(0, 0, 0, 0)
          startDate.setHours(0, 0, 0, 0)
          endDate.setHours(0, 0, 0, 0)

          return (
            dayDate.getTime() >= startDate.getTime() &&
            dayDate.getTime() <= endDate.getTime()
          )
        })

        totalFans = days.reduce((total, day) => {
          if ('followers' in profileData[day])
            return total + profileData[day].followers
          else return total
        }, totalFans)

        totalEngagement = days.reduce((total, day) => {
          if ('engagement' in profileData[day]) {
            return total + profileData[day].engagement
          } else return total
        }, totalEngagement)
      }),
    )
    const data = {
      brandName,
      brandProfiles: brandProfiles.length,
      totalFans,
      totalEngagement,
    }
    console.log(data)
    return data
  })

  //console.log(brandData)
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
