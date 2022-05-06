import { useStorage } from '@vueuse/core'
import { computed, inject, onMounted, onUnmounted, provide, watch } from 'vue'
import type { InjectionKey, WritableComputedRef } from 'vue'
import type { Palettes } from '../../node'

export type ThemeModeRef = WritableComputedRef<Palettes>

export const themeModeSymbol: InjectionKey<ThemeModeRef> = Symbol(
  __VUEPRESS_DEV__ ? 'darkMode' : ''
)

/**
 * Inject dark mode global computed
 */
export const useThemeMode = (): ThemeModeRef => {
  const themeMode = inject(themeModeSymbol)
  if (!themeMode) {
    throw new Error('useThemeMode() is called without provider.')
  }
  return themeMode
}

/**
 * Create dark mode ref and provide as global computed in setup
 */
export const setupThemeMode = (): void => {
  // const themeLocale = useThemeLocaleData()
  const themeStorage = useStorage<Palettes>('vuepress-color-scheme', 'light')

  const themeMode = computed<Palettes>({
    get() {
      return themeStorage.value
    },
    set(val) {
      themeStorage.value = val || 'light'
    },
  })
  provide(themeModeSymbol, themeMode)

  updateHtmlDarkClass(themeMode)
}

export const updateHtmlDarkClass = (themeMode: ThemeModeRef): void => {
  const update = (value = themeMode.value): void => {
    const htmlEl = window?.document.querySelector('html')
    htmlEl?.setAttribute('data-theme', value)
  }

  onMounted(() => {
    watch(themeMode, update, { immediate: true })
  })

  onUnmounted(() => update())
}
