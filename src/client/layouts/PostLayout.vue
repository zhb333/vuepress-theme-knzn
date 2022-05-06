<script setup lang="ts">
import ThemeLayout from './ThemeLayout.vue'
import CommonFooter from './components/CommonFooter.vue'
import { usePageData } from '@vuepress/client'
const pageData = usePageData()
console.log(pageData.value)
</script>
<template>
  <ThemeLayout>
    <template #default>
      <div class="markdown-body">
        <Content :page-key="pageData.key" />
      </div>
    </template>
    <template #footer>
      <CommonFooter />
    </template>
  </ThemeLayout>
</template>
