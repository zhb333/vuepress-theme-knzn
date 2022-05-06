<script setup lang="ts">
import { withBase } from '@vuepress/client'
import { useThemeLocaleData, useThemeMode } from '../../hooks'
import { computed } from 'vue'
import type { Palettes } from '../../../node'

const themeLocale = useThemeLocaleData()
const themeMode = useThemeMode()
const backgroundImage = computed(() => {
  return (
    themeLocale.value.palettes?.[themeMode.value]?.backgroundImage ||
    themeLocale.value.backgroundImage ||
    ''
  )
})

// https://color.oulu.me/
const backgroundImageMap: Record<Palettes, string> = {
  light: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  dark: 'linear-gradient(to top, #333 0%, #3fd 50%, #333 100%)',
  yellow: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
  green: 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)',
}

if (themeLocale.value.backgroundImageMap) {
  for (const key in themeLocale.value.backgroundImageMap) {
    const value = themeLocale.value.backgroundImageMap[key]
    if (value) {
      backgroundImageMap[key] = value
    }
  }
}

const backgroundStyle = computed(() => {
  const obj = {}
  if (backgroundImage.value) {
    obj['background-image'] = `url("${withBase(backgroundImage.value)}")`
  } else {
    obj['background-image'] = backgroundImageMap[themeMode.value]
  }
  return obj
})
</script>
<template>
  <div class="theme-background" :style="backgroundStyle"></div>
</template>
