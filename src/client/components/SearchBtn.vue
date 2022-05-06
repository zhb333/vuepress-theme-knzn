<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSearch = (): void => {
  router.replace({ path: '/search/' })
}
</script>
<template>
  <span
    role="button"
    aria-label="搜索"
    title="搜索"
    class="iconfont icon-search search-button"
    @click="handleSearch"
  ></span>
</template>
