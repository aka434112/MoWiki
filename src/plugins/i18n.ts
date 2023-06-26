import { nextTick } from 'vue'
import { WritableComputedRef } from '@vue/reactivity'
import { Composer, createI18n, I18n, I18nOptions } from 'vue-i18n'
import axios from 'axios'
import { isFunction } from 'lodash-es'

export const VUE_I18N_DEFAULT_LOCALE = 'en'
export const VUE_I18N_DEFAULT_FALLBACK_LOCALE = 'en'
export const LOCALES_DIRECTORY_NAME = 'locales'
const LOCALES_FILE_PATH_PREFIX = `../${LOCALES_DIRECTORY_NAME}/`

export function setupI18n(
  options: I18nOptions = {
    locale: VUE_I18N_DEFAULT_LOCALE,
    fallbackLocale: VUE_I18N_DEFAULT_FALLBACK_LOCALE,
    legacy: false,
  }
): I18n {
  const i18n = createI18n(options)
  const lang = options.locale || VUE_I18N_DEFAULT_FALLBACK_LOCALE
  setI18nLanguage(i18n, lang)
  return i18n
}

export function setI18nLanguage(
  i18n: I18n,
  locale: string = VUE_I18N_DEFAULT_FALLBACK_LOCALE
): string {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global as unknown as Composer).locale.value = locale
  }

  axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html')?.setAttribute('lang', locale)

  return locale
}

const parseVueI18nLocaleMessages = (messages) => {
  const defaultVal = messages?.default || {}
  return isFunction(defaultVal) ? defaultVal() : defaultVal
}

export async function loadVueI18nLocaleMessages(
  locale: string = VUE_I18N_DEFAULT_FALLBACK_LOCALE
): Promise<string> {
  const messages = await import(
    /* @vite-ignore */ `${LOCALES_FILE_PATH_PREFIX}common.${locale}.js`
  )
  i18n.global.mergeLocaleMessage(locale, parseVueI18nLocaleMessages(messages))
  await nextTick()
  return setI18nLanguage(i18n, locale)
}

export async function addVueI18nLocaleMessages(localePath: string) {
  let currentLocale = VUE_I18N_DEFAULT_FALLBACK_LOCALE
  if (i18n.mode === 'legacy') {
    currentLocale = i18n.global.locale as string
  } else {
    currentLocale = (i18n.global.locale as WritableComputedRef<string>)
      .value as string
  }
  try {
    const localeFileNameEndsWith = `.${currentLocale}.js`
    const localeFile = await import(
      `${LOCALES_FILE_PATH_PREFIX}${localePath}${localeFileNameEndsWith}`
    )
    i18n.global.mergeLocaleMessage(
      currentLocale,
      parseVueI18nLocaleMessages(localeFile)
    )
  } catch (err) {
    console.error('Translation load failure: ', err)
  }
}

export const i18n = setupI18n()
export default [i18n, {}]
