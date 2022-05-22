<script setup lang="ts">
import { useDarkMode, useThemeOptions } from '../hooks'
import { useSiteData, withBase } from '@vuepress/client'
import { computed } from 'vue'

const siteData = useSiteData()
const themeOptions = useThemeOptions()
const isDarkMode = useDarkMode()

const logoUrl = computed(() => {
  const { logo, darkLogo } = themeOptions.value
  return (isDarkMode.value ? darkLogo : logo) || logo
})
</script>
<template>
  <RouterLink to="/" class="logo-link">
    <img v-if="logoUrl" :src="withBase(logoUrl)" alt="" class="logo" />
    <strong v-if="siteData.title" class="title">{{ siteData.title }}</strong>
  </RouterLink>
</template>
