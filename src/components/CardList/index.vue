<template>
  <div class="cards" v-if="cities.length > 0">
    <CardComponent v-for="city in cities" :key="city" :id="city" />
  </div>
</template>

<script>
import CardComponent from '@/components/ui/Card/index.vue'

export default {
  name: 'CardList',
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  components: {
    CardComponent
  }
}
</script>

<style>
@import './styles.scss';
</style>
