<template>
  <Loader v-if="isLoading" />
  <div v-show="!isLoading" class="card" :class="!isDay ? 'night' : ''">
    <div class="radio">
      <div class="radio__item">
        <input type="radio" v-model="days" id="one" :name="`switcher${id}`" :value="1" checked />
        <label for="one">{{ $t('home.card.day', 1) }}</label>
      </div>
      <div class="radio__item">
        <input type="radio" v-model="days" id="five" :name="`switcher${id}`" :value="5" />
        <label for="five">{{ $t('home.card.day', 5) }}</label>
      </div>
    </div>
    <div class="card__list">
      <div class="card__buttons">
        <CrossIcon :is-dark-theme="isDay" @click="showModal" />
        <div class="card__favourite"><FavouriteComponent :id="id" /></div>
        <ToggleGroup @on-click="changeTheme" :isDarkTheme="isDay" />
      </div>
      <ChartComponent
        @show-loading="showIsLoading"
        @hide-loading="hideIsLoading"
        :id="id"
        :days="days"
        :isDay="isDay"
      />
      <transition name="modal">
        <DeleteItemModal :id="id" v-if="modal" @close="hideModal"> </DeleteItemModal>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import DeleteItemModal from '@/components/ui/Modals/DeleteItemModal.vue'
import Loader from '@/components/ui/Loader/index.vue'
import ToggleGroup from '@/components/ui/ToggleGroup/index.vue'
import FavouriteComponent from '@/components/ui/Favourite/index.vue'
import { useToggle } from '@/hooks/useToggle'
import ChartComponent from '@/components/ui/Chart/index.vue'

export default {
  name: 'CardComponent',
  components: {
    CrossIcon,
    DeleteItemModal,
    Loader,
    ToggleGroup,
    FavouriteComponent,
    ChartComponent
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { toggle: modal, showToggle: showModal, hideToggle: hideModal } = useToggle(false)
    const {
      toggle: isLoading,
      showToggle: showIsLoading,
      hideToggle: hideIsLoading
    } = useToggle(false)

    const days = ref(1)
    const isDay = ref(true)

    const changeTheme = (value) => {
      isDay.value = value
    }

    return {
      modal,
      showModal,
      hideModal,
      isLoading,
      isDay,
      changeTheme,
      days,
      showIsLoading,
      hideIsLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
