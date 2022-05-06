<script setup lang="ts">
import { useSiteLocaleData } from '@vuepress/client'
import { useThemeLocaleData } from '../../hooks'
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()

const currentYear = new Date().getFullYear()
</script>
<template>
  <footer class="copyright">
    <a class="beian" :href="themeLocale.beianUrl">
      {{ themeLocale.beian }}
    </a>
    <span class="delimiter">|</span>
    <span class="info"
      >Copyright © {{ themeLocale.footerStartDate }}-{{ currentYear }}
      {{ siteLocale.title }}</span
    >
  </footer>
</template>
