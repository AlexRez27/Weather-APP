<template>
  <div class="fav">
    <h1 class="fav__title">{{ $t('favourites.title') }}</h1>

    <div class="fav__button">
      <ButtonComponent route="/"
        ><span class="fav__buttontext">{{ $t('favourites.back') }}</span>
      </ButtonComponent>
    </div>
    <CardList v-if="favouritesCities.length > 0" :cities="favouritesCities" />
    <h2 v-else>{{ $t('favourites.empty', { emoji: '&#128542;' }) }}</h2>
  </div>
</template>

<script>
import { computed } from 'vue'
import useUserFavourites from '@/stores/favourites'
import ButtonComponent from '@/components/ui/Button/index.vue'
import CardList from '@/components/CardList/index.vue'

export default {
  name: 'FavouritesPage',
  components: {
    ButtonComponent,
    CardList
  },
  setup() {
    const store = useUserFavourites()
    const favouritesCities = computed(() => store.getUserFavourites)

    return { favouritesCities }
  }
}
</script>

<style lang="scss" scoped>
.fav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__title {
    text-align: center;
    margin-top: 10px;
  }
  &__button {
    width: 250px;
    text-decoration: none;
    @include breakpoint(medium) {
      width: 95%;
      margin: 15px auto;
    }
  }
  &__buttontext {
    font-size: 20px;
    text-decoration: none;
  }
}
</style>
