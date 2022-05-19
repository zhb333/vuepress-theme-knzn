import { useDarkMode, useThemeOptions } from '../hooks'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

export type Bloger = {
  blogger: string | undefined
  slogan: string | undefined
  avatarSrc: ComputedRef<string | undefined>
}

export const useBloger = (): Bloger => {
  const themeOptions = useThemeOptions()
  const isDarkMode = useDarkMode()

  const { blogger, slogan } = themeOptions.value

  const avatarSrc = computed(() => {
    const { avatar, darkAvatar } = themeOptions.value
    return (isDarkMode.value ? darkAvatar : avatar) || avatar
  })
  return {
    avatarSrc,
    blogger,
    slogan,
  }
}
