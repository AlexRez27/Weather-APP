<template>
  <FavouriteIcon @click="setIsFavourite" :class="isFavourite ? 'favourite' : ''" />
  <NoMoreFavourites @close="hideModal" v-if="modal" />
</template>

<script>
import useUserFavourites from '@/stores/favourites'
import { ref, computed, onMounted } from 'vue'
import FavouriteIcon from '@/components/icons/FavouriteIcon.vue'
import NoMoreFavourites from '@/components/ui/Modals/NoMoreFavourites.vue'
import { useToggle } from '@/hooks/useToggle'

export default {
  name: 'FavouriteComponent',
  components: {
    FavouriteIcon,
    NoMoreFavourites
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useUserFavourites()
    const { addToFavourites, removeFromFavourites } = store
    const favourites = computed(() => store.getUserFavourites)
    const isFavourite = ref(false)

    const { toggle: modal, showToggle: showModal, hideToggle: hideModal } = useToggle()

    onMounted(() => {
      isFavourite.value = favourites.value?.includes(props.id)
    })

    const setIsFavourite = () => {
      if (!isFavourite.value) {
        if (store.getUserFavourites && store.getUserFavourites.length === 5) {
          showModal()
          return
        }
        isFavourite.value = true
        addToFavourites(props.id)
      } else {
        isFavourite.value = false
        removeFromFavourites(props.id)
      }
    }

    return { isFavourite, setIsFavourite, modal, hideModal }
  }
}
</script>

<style lang="scss">
.favourite {
  color: red;
}
</style>
