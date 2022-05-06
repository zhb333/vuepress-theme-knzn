<script setup lang="ts">
import { computed } from 'vue'
import { useThemeLocaleData, useThemeMode } from '../hooks'
import { useSiteLocaleData } from '@vuepress/client'
import LogoSvg from './LogoSvg.vue'

const themeLocale = useThemeLocaleData()
const siteLocale = useSiteLocaleData()

const siteTitle = computed(() => {
  return siteLocale.value.title
})

const themeMode = useThemeMode()

const logoSrc = computed(() => {
  return (
    themeLocale.value.palettes?.[themeMode.value]?.logo ||
    themeLocale.value.logo
  )
})
</script>
<template>
  <RouterLink to="/" class="logo-wrapper">
    <img v-if="logoSrc" :src="logoSrc" alt="" class="logo" />
    <LogoSvg v-else class="logo" />
    <strong class="title">{{ siteTitle }}</strong>
  </RouterLink>
</template>
