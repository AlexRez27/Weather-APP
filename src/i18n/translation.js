import i18n from '@/i18n'
import { nextTick } from 'vue'

const Trans = {
  supportedLocales: import.meta.env.VITE_SUPPORTED_LOCALES.split(','),
  async switchLanguage(newLocale) {
    await Trans.loadLocalMessages(newLocale)
    i18n.global.locale.value = newLocale
    document.querySelector('html').setAttribute('lang', newLocale)
  },

  async loadLocalMessages(locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }

    return nextTick()
  }
}

export default Trans
