<script setup lang="ts">
import type { PropType } from 'vue'
import type { ThemePageData } from '../../node'
import { getPostInfo } from '../utils'

const props = defineProps({
  post: {
    type: Object as PropType<ThemePageData>,
    required: true,
  },
})

const { author, date, tags, categories } = getPostInfo(props.post)
</script>
<template>
  <div class="post-info">
    <span class="post-info-item">
      <i class="iconfont icon-avatar" title="作者"></i>
      {{ author }}</span
    >
    <span class="post-info-item">
      <i class="iconfont icon-datetime" title="日期"></i>
      {{ date }}</span
    >
    <span v-if="categories!.length" class="post-info-item">
      <i class="iconfont icon-categorynormal" title="分类"></i>
      <RouterLink
        v-for="text of categories"
        :key="text"
        :to="{ path: '/categories/', query: { category: text } }"
        class="post-type"
        >{{ text }}</RouterLink
      >
    </span>
    <span v-if="tags!.length" class="post-info-item">
      <i class="iconfont icon-tag" title="标签"></i>
      <RouterLink
        v-for="text of tags"
        :key="text"
        :to="{ path: '/tags/', query: { tag: text } }"
        class="post-type"
        >{{ text }}</RouterLink
      >
    </span>
  </div>
</template>
