<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <slot name="header"> </slot>
        </div>

        <div class="modal__body">
          <slot name="body"> </slot>
        </div>

        <div class="modal__footer">
          <slot name="footer"></slot>
          <!-- 
            <ButtonComponent class="button" type="danger" @click="$emit('remove')">
            <span class="modal__button">Yes</span>
          </ButtonComponent>
          <ButtonComponent class="button" @click="$emit('close')">
            <span class="modal__button">No</span></ButtonComponent
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent'
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
