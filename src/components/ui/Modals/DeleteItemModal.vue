<template>
  <ModalComponent>
    <template #body>
      <p>{{ $t('modals.delete') }}</p>
    </template>
    <template #footer>
      <ButtonComponent class="button" type="danger" @click="removeCity()">
        <span class="button-text">{{ $t('modals.yes') }}</span>
      </ButtonComponent>
      <ButtonComponent class="button" @click="$emit('close')">
        <span class="button-text">{{ $t('modals.no') }}</span>
      </ButtonComponent>
    </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/ui/Modal/index.vue'
import useWeatherStore from '@/stores/weather'
import useUserFavourites from '@/stores/favourites'
import ButtonComponent from '@/components/ui/Button/index.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'DeleteItemModal',
  components: {
    ModalComponent,
    ButtonComponent
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  emits: ['close'],
  setup(props) {
    const weatherStore = useWeatherStore()
    const favouriteStore = useUserFavourites()
    const route = useRoute()

    const removeCity = () => {
      weatherStore.removeCity(props.id)
      if (route.name === 'favourites') {
        favouriteStore.removeFromFavourites(props.id)
      }
    }

    return { weatherStore, removeCity }
  }
}
</script>

<style lang="scss" scoped>
.button-text {
  font-size: 30px;
}
.button-text + .button-text {
  margin-right: 10px;
}

.button + .button {
  margin-left: 10px;
}
</style>
