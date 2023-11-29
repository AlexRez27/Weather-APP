<template>
  <canvas :id="id" class="card__item"></canvas>
</template>

<script>
import { onMounted, watch, reactive } from 'vue'
import cities from '@/jsons/ua'
import useWeatherStore from '@/stores/weather'
import {
  getTimeFromUnixDate,
  getDateFromUnixDate,
  getAvgTempByDays,
  getDayOrNightHours,
  transliterateCityNameByLocale
} from '@/helpers'
import Chart from 'chart.js/auto'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ChartComponent',
  props: {
    id: {
      type: Number,
      required: true
    },
    days: {
      type: Number,
      required: true
    },
    isDay: {
      type: Boolean,
      required: true
    }
  },
  emits: ['show-loading', 'hide-loading'],

  setup(props, { emit }) {
    const store = useWeatherStore()
    const chart = reactive({})
    const { t, locale } = useI18n()

    const loadChart = async () => {
      emit('show-loading')
      await store.fetchWeatherInfo({
        name: cities[props.id].city,
        lat: cities[props.id].lat,
        lng: cities[props.id].lng,
        id: props.id
      })
      emit('hide-loading')
      let data = store.getWeather.find((el) => el.id === props.id).temp
      let currentDay = new Date()
      currentDay = `${currentDay.getDate()} ${currentDay.getMonth()}`
      const currentDayData = data.filter((el) => getDateFromUnixDate(el.dt) === currentDay)
      if (props.days === 1) {
        data = getDayOrNightHours(currentDayData, false)
      } else {
        data = getAvgTempByDays(data, props.isDay, props.days)
      }
      Chart.defaults.font.size = 14
      Chart.defaults.font.weight = 'normal'

      const chartElement = document.getElementById(props.id)
      if (chartElement) {
        chart.value = new Chart(document.getElementById(props.id), {
          type: 'bar',
          options: {
            animation: {
              duration: 0
            },
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                }
              }
            }
          },
          data: {
            labels: data.map((row) => getTimeFromUnixDate(row.dt)),
            datasets: [
              {
                label: `${t('home.card.title')}${transliterateCityNameByLocale(
                  cities[props.id].city,
                  locale
                )}`,
                data: data.map((row) => row.temp)
              }
            ]
          }
        })
      }
    }

    onMounted(async () => {
      await loadChart()
    })

    watch(locale, async () => {
      if (chart.value) {
        await chart.value.destroy()
      }

      await loadChart()
    })

    watch(
      () => [props.days, props.isDay],
      async () => {
        if (chart.value) {
          await chart.value.destroy()
        }

        await loadChart()
      }
    )
  }
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
