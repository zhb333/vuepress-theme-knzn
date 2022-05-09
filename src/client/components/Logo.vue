<script setup lang="ts">
import { useThemeOptions } from '../hooks'
import { useSiteData } from '@vuepress/client'

const siteData = useSiteData()
const themeOptions = useThemeOptions()
</script>
<template>
  <RouterLink to="/" class="logo-link">
    <img
      v-if="themeOptions.logo"
      :src="themeOptions.logo"
      alt=""
      class="logo"
    />
    <strong v-if="siteData.title" class="title">{{ siteData.title }}</strong>
  </RouterLink>
</template>
