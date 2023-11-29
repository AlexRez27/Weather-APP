import { defineStore } from 'pinia'
import axios from 'axios'

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weather: [],
    cities: []
  }),

  actions: {
    async fetchWeatherInfo({ name, lat, lng, id }) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      const getData = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
        )
        .then((res) => {
          return res.data
        })
      const result = {
        name: name,
        id: id,
        temp: getData.list.map((el) => {
          return {
            dt: el.dt,
            temp: el.main.temp
          }
        })
      }
      const idx = this.weather.findIndex((el) => el.id === id)
      if (idx < 0) {
        this.weather.push(result)
      }
    },
    addCity(payload) {
      const idx = this.cities.findIndex((el) => el === payload)
      if (idx < 0) {
        this.cities.push(payload)
      }
    },
    removeFavourites() {
      this.weather = this.weather.filter((el) => this.cities.includes(el.id))
    },
    removeCity(id) {
      this.weather = this.weather.filter((el) => el !== id)
      this.cities = this.cities.filter((el) => el !== id)
    }
  },

  getters: {
    getWeather() {
      return this.weather
    },
    getCities() {
      return this.cities
    }
  }
})

export default useWeatherStore
