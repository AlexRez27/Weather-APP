import { defineStore } from 'pinia'
import axios from 'axios'

const useUserLocation = defineStore('usersLocation', {
  state: () => ({
    location: ''
  }),

  actions: {
    async fetchUsersLocation() {
      const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY
      await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${API_KEY}`).then((res) => {
        this.location = res.data.city.name
      })
    }
  },
  getters: {
    getUsersLocation() {
      return this.location
    }
  }
})

export default useUserLocation
