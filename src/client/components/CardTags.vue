<script setup lang="ts">
import { useThemeLocaleData } from '../../hooks'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { colors, getInfoFromPages } from '../../utils'
import type { CategoryType } from '../../types'
import { useRouter } from 'vue-router'
import type { ThemePageData } from '../../../node'

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

const themeLocale = useThemeLocaleData()
const tags = ref<CategoryType[]>(getInfoFromPages(props.pages, 'tags'))

if (props.all) {
  tags.value.unshift({ text: 'all', num: props.pages.length })
}

const tagsList = computed(() => {
  if (props.all) {
    return tags.value
  } else {
    return tags.value.slice(0, themeLocale.value.maxTags)
  }
})

const getBackgroundColor = (): Record<string, string> => {
  const index = Math.floor(Math.random() * colors.length)
  return {
    'background-color': colors[index],
  }
}

const handleTag = (tag): void => {
  router.push({ path: '/tags/', query: { tag } })
}
</script>
<template>
  <!-- tags -->
  <section class="card-box card-wrapper tags">
    <header class="header">
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
    <div v-if="!props.all && tags.length > themeLocale.maxTags" class="more">
      <span class="more-text" @click="handleTag('all')"
        >更多
        <i class="iconfont icon-next"></i>
      </span>
    </div>
  </section>
</template>
