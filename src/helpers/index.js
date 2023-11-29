import { ukrToEng, tranlitRegionsToCyr } from './constants'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

export const normalizedCityArray = (ar) => {
  return ar.map((el, i) => {
    return {
      id: i,
      name: el.city,
      region: el.admin_name,
      fullname: `${el.city} (${el.admin_name})`,
      ukrFullname:
        CyrillicToTranslit({ preset: 'uk' }).reverse(el.city) +
        ' (' +
        tranlitRegionsToCyr[el.admin_name] +
        ' область)',
      lat: el.lat,
      lng: el.lng
    }
  })
}

export const transliterateCityNameByLocale = (city, locale) => {
  return locale._value === 'ua' ? CyrillicToTranslit({ preset: 'uk' }).reverse(city) : city
}

export const transliterateUkrainianToEnglish = (text) => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    result += ukrToEng[char] ?? char
  }

  return result
}

export const getTimeFromUnixDate = (unixDate) => {
  let date = new Date(unixDate * 1000)
  if (date.getTime() > 0) {
    let hours = date.getHours()
    let minutes = '0' + date.getMinutes()

    return `${hours}: ${minutes}`
  }
  return unixDate
}

export const getDateFromUnixDate = (unixDate) => {
  let date = new Date(unixDate * 1000)
  let month = date.getMonth()
  let day = date.getDate()
  return `${day} ${month}`
}
export function formatDate(timestamp, isDay) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const date = new Date(timestamp * 1000)
  const hours = date.getHours()

  if ((isDay && hours >= 8 && hours < 20) || (!isDay && (hours >= 20 || hours < 8))) {
    const day = date.getDate()
    const month = months[date.getMonth()]
    return `${day} ${month}`
  }

  return null
}

export const getDayOrNightHours = (data, isDay) => {
  const filteredData = data.map((el) => {
    const hours = new Date(el.dt * 1000).getHours()
    if ((isDay && hours >= 8 && hours < 20) || (!isDay && (hours >= 20 || hours < 8))) {
      return el
    }
    return el
  })
  return filteredData
}

export const getAvgTempByDays = (data, isDay, days) => {
  function calculateAverageTemperature(data, isDay, days) {
    const result = data.reduce((acc, entry) => {
      const formattedDate = formatDate(entry.dt, isDay)
      if (formattedDate !== null) {
        if (!acc[formattedDate]) {
          acc[formattedDate] = { dt: formattedDate, tempSum: 0, count: 0 }
        }
        acc[formattedDate].tempSum += entry.temp
        acc[formattedDate].count += 1
      }
      return acc
    }, {})

    const filteredResult = Object.values(result).slice(0, days)
    return filteredResult.map(({ dt, tempSum, count }) => ({
      dt,
      temp: Math.round((tempSum / count) * 10) / 10
    }))
  }

  return calculateAverageTemperature(data, isDay, days)
}
