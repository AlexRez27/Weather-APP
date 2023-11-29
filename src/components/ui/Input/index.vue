<template>
  <h1 class="title">{{ $t('home.title') }}</h1>

  <div class="dropdown">
    <input
      class="dropdown__search"
      @input="setShowCityList"
      id="city"
      :placeholder="placeholder"
      :disabled="cityList.length === 5"
      v-model="chosenCity.data.fullname"
      type="text"
      @keydown.tab.prevent="
        chosenCity.data.fullname && filteredCities.length > 0
          ? chooseCity(filteredCities[0].id)
          : null
      "
    />
    <ul
      class="dropdown__content"
      v-if="chosenCity.data.fullname && filteredCities.length > 0 && showCityList"
    >
      <li
        @click="chooseCity(city.id)"
        class="dropdown__contentitem"
        v-for="city in filteredCities"
        :key="city.id"
      >
        {{ locale === 'ua' ? city.ukrFullname : city.fullname }}
      </li>
    </ul>
    <div class="button-wrapper">
      <ButtonComponent :disabled="isDisabled" @on-click.stop="addCity" text="+"></ButtonComponent>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { normalizedCityArray } from '@/helpers'
import useWeatherStore from '@/stores/weather'
import ButtonComponent from '@/components/ui/Button/index.vue'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { useI18n } from 'vue-i18n'
import Cities from '@/jsons/UA'

export default {
  name: 'InputComponent',
  components: {
    ButtonComponent
  },
  setup() {
    const chosenCity = reactive({ data: { name: '', region: '', fullname: '' } })
    const showCityList = ref(false)
    const cityArray = normalizedCityArray(Cities)

    const filteredCities = computed(() => {
      if (chosenCity.data) {
        return cityArray.filter((el) => {
          const searchText = CyrillicToTranslit({ preset: 'uk' }).transform(
            chosenCity?.data?.fullname
          )

          return new RegExp(`^${searchText}.*`, 'i')?.test(el.name)
        })
      }
      return null
    })

    const setShowCityList = () => {
      showCityList.value = true
    }

    const chooseCity = (id) => {
      const city = filteredCities.value?.find((el) => el.id === id)

      chosenCity.data = {
        name: city.name,
        region: city.region,
        fullname: locale._value === 'ua' ? city.ukrFullname : city.fullname,
        locale: locale._value,
        lat: city.lat,
        lng: city.lng,
        id: city.id
      }
      showCityList.value = false
    }

    const { t, locale } = useI18n()
    const placeholder = computed(() => {
      return store.getWeather.length === 5
        ? t('home.placeholder.max')
        : t('home.placeholder.default')
    })

    const isDisabled = computed(() => {
      const cityListLength = cityList.value.filter((el) => el.id === chosenCity.data.id).length
      return cityListLength > 0 || store.getWeather.length === 5 || !chosenCity.data.fullname
    })

    const store = useWeatherStore()

    const cityList = computed(() => store.getWeather)
    const addCity = () => {
      if (!isDisabled.value) {
        store.addCity(chosenCity.data.id)
        chosenCity.data.fullname = ''
      }
    }

    return {
      chosenCity,
      filteredCities,
      chooseCity,
      setShowCityList,
      showCityList,
      addCity,
      isDisabled,
      placeholder,
      cityList,
      locale
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
