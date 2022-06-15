<script setup lang="ts">
import { useThemeOptions } from '../hooks'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { getInfoFromPages } from '../utils'
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

const title = props.all ? '全部分类' : '热门分类'

const themeOptions = useThemeOptions()
const categories = ref<LabelItem[]>(getInfoFromPages(props.pages, 'categories'))

const total = categories.value.reduce((res, item) => {
  res += item.num
  return res
}, 0)

if (props.all) {
  categories.value.unshift({ text: 'all', num: total })
}

const categoriesList = computed(() => {
  if (props.all) {
    return categories.value
  } else {
    return categories.value.slice(0, themeOptions.value.maxCategories)
  }
})

const handleItem = (category): void => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('query', category)
  }
  router.push({ path: '/categories/', query: { category } })
}

const category = computed(() => {
  return (
    router.currentRoute.value.query.category ||
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('query'))
  )
})

const isShowMore = computed(() => {
  return categories.value.length > (themeOptions.value.maxCategories as number)
})
</script>
<template>
  <!-- categories -->
  <section class="card-box card-wrapper categories">
    <header>
      <h3 class="title">
        <i class="iconfont icon-categorynormal"></i>
        <span> {{ title }} </span>
      </h3>
    </header>
    <ul class="list">
      <li
        v-for="item of categoriesList"
        :key="item.text"
        class="item"
        :class="{ active: item.text === category }"
        @click="handleItem(item.text)"
      >
        <span class="text" :title="item.text">{{ item.text }}</span
        ><span class="num">{{ item.num }}</span>
      </li>
      <li v-if="!props.all && isShowMore" class="more">
        <span class="more-text" @click="handleItem('all')"
          >更多
          <i class="iconfont icon-next"></i>
        </span>
      </li>
    </ul>
  </section>
</template>
