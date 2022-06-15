<script setup lang="ts">
import { useThemeOptions } from '../hooks'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { getInfoFromPages, Tagcolors } from '../utils'
import type { LabelItem } from '../types'
import { useRouter } from 'vue-router'
import type { ThemePageData } from '../../node'

const router = useRouter()

const props = defineProps({
  all: {
    type: Boolean,
    default: false,
  },
  pages: {
    type: Array as PropType<ThemePageData[]>,
    required: true,
  },
})

const title = props.all ? '全部标签' : '热门标签'

const themeOptions = useThemeOptions()
const tags = ref<LabelItem[]>(getInfoFromPages(props.pages, 'tags'))

const total = tags.value.reduce((res, item) => {
  res += item.num
  return res
}, 0)

if (props.all) {
  tags.value.unshift({ text: 'all', num: total })
}

const tagsList = computed(() => {
  if (props.all) {
    return tags.value
  } else {
    return tags.value.slice(0, themeOptions.value.maxTags)
  }
})

const getBackgroundColor = (): Record<string, string> => {
  const index = Math.floor(Math.random() * Tagcolors.length)
  return {
    'background-color': Tagcolors[index],
  }
}

const handleTag = (tag): void => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('query', tag)
  }
  router.push({ path: '/tags/', query: { tag } })
}

const isShowMore = computed(() => {
  return tags.value.length > (themeOptions.value.maxTags as number)
})
</script>
<template>
  <!-- tags -->
  <section class="card-box card-wrapper tags">
    <header>
      <h3 class="title">
        <i class="iconfont icon-tag"></i>
        <span> {{ title }} </span>
      </h3>
    </header>
    <ul class="list">
      <li
        v-for="item of tagsList"
        :key="item.text"
        class="item"
        :style="getBackgroundColor()"
        @click="handleTag(item.text)"
      >
        <span class="text" :title="item.text">{{ item.text }}</span
        ><span class="num">{{ item.num }}</span>
      </li>
    </ul>
    <div v-if="!props.all && isShowMore" class="more">
      <span class="more-text" @click="handleTag('all')"
        >更多
        <i class="iconfont icon-next"></i>
      </span>
    </div>
  </section>
</template>
