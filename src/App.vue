<template>
  <DefaultLayout> <RouterView /> </DefaultLayout>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import useUserFavourites from '@/stores/favourites'
import DefaultLayout from '@/layouts/default.vue'

const store = useUserFavourites()

onMounted(() => {
  store.loadFromLocalStorage()
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
