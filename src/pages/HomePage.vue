<template>
  <div>
    <!-- <h1 class="title">Awesome Weather Application</h1> -->
    <div class="favourites" @click="gotoFavourites"><FavouriteIcon /></div>
    <InputComponent />
    <CardList :cities="cityList" />
  </div>
</template>

<script>
import InputComponent from '@/components/ui/Input/index.vue'
import CardList from '@/components/CardList/index.vue'
import { computed, onMounted, ref } from 'vue'
import useWeatherStore from '@/stores/weather'
import useUserLocation from '@/stores/ussersLocation'
import FavouriteIcon from '@/components/icons/FavouriteIcon.vue'
import { useRouter } from 'vue-router'
import cities from '@/jsons/ua'

export default {
  name: 'HomePage',
  components: {
    InputComponent,
    CardList,
    FavouriteIcon
  },
  setup() {
    const storeLocation = useUserLocation()
    const storeWeather = useWeatherStore()
    const isLoading = ref(false)

    onMounted(async () => {
      const regions = [...new Set(cities.map((el) => el.admin_name))]
      console.log({ regions })

      isLoading.value = true
      await storeLocation.fetchUsersLocation()
      const idx = cities.findIndex((city) => city.city === storeLocation.getUsersLocation)
      store.addCity(idx)
      isLoading.value = false
      storeWeather.removeFavourites()
    })

    const store = useWeatherStore()
    const cityList = computed(() => {
      return store.getCities
    })

    const router = useRouter()
    const gotoFavourites = () => {
      router.push('favourites')
    }

    return { cityList, isLoading, gotoFavourites }
  }
}
</script>

<style lang="scss" scoped>
.favourites {
  position: absolute;
  right: 100px;
  top: 10px;
  color: red;
  cursor: pointer;
}

.title {
  text-align: center;
  margin-top: 10px;
}
</style>
