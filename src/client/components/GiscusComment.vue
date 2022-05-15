<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useDarkMode, useThemeOptions } from '../hooks'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const isDarkMode = useDarkMode()
const themeOptions = useThemeOptions()
const { comment } = themeOptions.value
const route = useRoute()
const isShow = ref(true)

watch(
  () => route.path,
  () => {
    isShow.value = false
    setTimeout(() => {
      isShow.value = true
    }, 10)
  }
)
</script>
<template>
  <Giscus
    v-if="comment && isShow"
    id="comments"
    :repo="comment.repo"
    :repo-id="comment.repoId"
    :category="comment.category"
    :category-id="comment.categoryId"
    :lang="comment.lang"
    mapping="pathname"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="bottom"
    :theme="isDarkMode ? 'dark' : 'light'"
    crossorigin="anonymous"
  />
</template>
