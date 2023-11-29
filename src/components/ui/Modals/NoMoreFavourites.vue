<template>
  <ModalComponent>
    <template #body>
      <p>{{ $t('modals.noMoreFavourites') }}</p>
    </template>
    <template #footer>
      <ButtonComponent class="button" @click="$emit('close')">
        <span class="button-text">{{ $t('modals.ok') }}</span>
      </ButtonComponent>
    </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/ui/Modal/index.vue'
import ButtonComponent from '@/components/ui/Button/index.vue'

export default {
  name: 'NoMoreFavourites',
  components: {
    ModalComponent,
    ButtonComponent
  },
  emits: ['close']
}
</script>

<style lang="scss" scoped>
.button-text {
  font-size: 30px;
}
</style>
