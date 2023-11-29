<template>
  <div class="box">
    <select class="lang" @change="switchLanguage">
      <option
        v-for="sLocale in supportedLocales"
        :key="`locale-${sLocale}`"
        :value="sLocale"
        :selected="locale === sLocale"
      >
        {{ t(`locale.${sLocale}`) }}
      </option>
    </select>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import Trans from '@/i18n/translation.js'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { t, locale } = useI18n()

    const supportedLocales = Trans.supportedLocales

    const switchLanguage = async (event) => {
      const newLocale = event.target.value

      await Trans.switchLanguage(newLocale)
    }
    return { supportedLocales, switchLanguage, t, locale }
  }
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
