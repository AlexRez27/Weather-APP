<template>
  <div class="container">
    <div class="header">
      <div class="empty"></div>
      <LanguageSwitcher />
    </div>
    <h1 class="header__text">{{ $t('layout.title') }}</h1>
    <slot />
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LanguageSwitcher
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
}

.header {
  /* position: fixed; */
  height: 70px;
  background-color: #1ebbd7;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-align: center;
  &__text {
    margin-right: 15px;
    text-align: center;
    text-transform: uppercase;
    @include breakpoint(medium) {
      font-size: 28px;
    }
  }
}
</style>
