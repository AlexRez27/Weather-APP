import { defineStore } from 'pinia'
import axios from 'axios'

const useUserFavourites = defineStore('userFavourites', {
  state: () => ({
    favourites: [],
    favouriteWeather: []
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
      const idx = this.favouriteWeather.findIndex((el) => el.id === id)
      if (idx < 0) {
        this.favouriteWeather.push(result)
      }
    },
    addToFavourites(id) {
      const idx = this.favourites?.findIndex((el) => el === id)
      if (idx < 0 && idx) {
        this.favourites.push(id)
        this.putIntoLocalStorage()
      }
    },
    removeFromFavourites(id) {
      this.favourites = this.favourites.filter((el) => el !== id)
      this.putIntoLocalStorage()
    },
    loadFromLocalStorage() {
      if (localStorage.getItem('favourites') !== null) {
        this.favourites = JSON.parse(localStorage.getItem('favourites'))
      }
    },
    putIntoLocalStorage() {
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    }
  },
  getters: {
    getUserFavourites() {
      return this.favourites
    },
    getFavouriteWeather() {
      return this.favourites
    }
  }
})

export default useUserFavourites
