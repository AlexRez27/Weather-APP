<template>
  <div :class="isDarkTheme ? 'move' : ''" class="sun-moon">
    <input @click="onClick" type="checkbox" />
    <span class="circle large"></span>
    <span class="circle small"></span>
  </div>
</template>

<script>
export default {
  name: 'ToggleGroup',
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true
    }
  },
  emits: ['on-click'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('on-click', !props.isDarkTheme)
    }

    return { onClick }
  }
}
</script>

<style>
@import './styles.scss';
</style>
