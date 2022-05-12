<script setup lang="ts">
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import type { PageHeader } from '@vuepress/client'

const props = defineProps({
  tocs: {
    type: Array as PropType<PageHeader[]>,
    required: true,
  },
})

const { tocs } = toRefs(props)

const handleToc = (title: string): void => {
  console.log(title)
}
console.log(tocs.value)
</script>
<template>
  <div v-if="tocs.length" class="card-box card-wrapper post-tocs">
    <header>
      <h3 class="title">
        <i class="iconfont icon-categorynormal"></i>
        <span> 目录 </span>
      </h3>
    </header>
    <ul class="list">
      <li
        v-for="item of tocs"
        :key="item.title"
        class="item"
        @click="handleToc(item.title)"
      >
        <span class="text" :title="item.title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
