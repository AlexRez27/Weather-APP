<template>
  <button
    v-if="!route"
    :class="type === 'danger' ? 'danger' : ''"
    :disabled="disabled"
    @click.stop="$emit('on-click', $event)"
    class="button"
    role="button"
  >
    {{ text }}
    <slot />
  </button>
  <router-link class="button link" v-else :to="route"> <slot /></router-link>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      required: false,
      default: 'main'
    },
    text: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    route: {
      type: String,
      required: false
    }
  },
  emits: ['on-click']
}
</script>

<style>
@import './styles.scss';
</style>
