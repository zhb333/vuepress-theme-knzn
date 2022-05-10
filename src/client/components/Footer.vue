<script setup lang="ts">
import { useSiteLocaleData } from '@vuepress/client'
import { useThemeOptions } from '../hooks'
const siteLocale = useSiteLocaleData()
const themeOptions = useThemeOptions()

let currentYear = new Date().getFullYear().toString()
currentYear =
  currentYear === themeOptions.value.siteStartDate ? 'Present' : currentYear
</script>
<template>
  <footer class="theme-footer">
    <div class="copyright">
      <a class="beian" :href="themeOptions.beianUrl">
        {{ themeOptions.beian }}
      </a>
      <span class="delimiter">|</span>
      <span class="info"
        >Copyright © {{ themeOptions.siteStartDate }}-{{ currentYear }}
        {{ siteLocale.title }}</span
      >
    </div>
  </footer>
</template>
