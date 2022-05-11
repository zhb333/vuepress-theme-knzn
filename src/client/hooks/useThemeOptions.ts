/**
 * 获取主题配置
 */
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import type { ThemeDataRef } from '@vuepress/plugin-theme-data/lib/client'
import type { ThemeOptions } from '../../node'

export const useThemeOptions = (): ThemeDataRef<ThemeOptions> =>
  useThemeData<ThemeOptions>()
