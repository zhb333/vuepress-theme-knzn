import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/client'
import type { ThemeLocaleData, ThemeLocaleOptions } from '../../node'

export const useThemeData = (): ThemeDataRef<ThemeLocaleData> =>
  _useThemeData<ThemeLocaleData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<ThemeLocaleOptions> =>
  _useThemeLocaleData<ThemeLocaleOptions>()
