<script setup lang="ts">
import { usePages } from '../hooks'
import { useRoute } from 'vue-router'
import { formatSidebarPages } from '../utils'

const route = useRoute()
const pages = usePages()
const dirPath = route.path.replace(/\w+\.html$/, '')
const sidebarPages = pages.filter((page) => page.path.startsWith(dirPath))
const sidebarList = formatSidebarPages(sidebarPages, dirPath)
console.log(sidebarList)
</script>
<template>
  <aside class="post-aside"></aside>
</template>
