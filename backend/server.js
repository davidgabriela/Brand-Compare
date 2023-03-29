const express = require('express')
const { getBrands, getProfileData } = require('./utils')

const app = express()

const HOST = '127.0.0.1'
const PORT = 3000

app.get('/brands', async (req, res) => {
  let brands = await getBrands()

  const brandData = await Promise.all(
    brands.map(async (brand) => {
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
        totalProfiles: brandProfiles.length,
        totalFans,
        totalEngagement,
      }
      return data
    }),
  )

  res.json(brandData)
})

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
