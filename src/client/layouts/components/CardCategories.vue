<script setup lang="ts">
import { useThemeLocaleData } from '../../hooks'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { getInfoFromPages } from '../../utils'
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
const categories = ref<CategoryType[]>(
  getInfoFromPages(props.pages, 'categories')
)

if (props.all) {
  categories.value.unshift({ text: 'all', num: props.pages.length })
}

const categoriesList = computed(() => {
  if (props.all) {
    return categories.value
  } else {
    return categories.value.slice(0, themeLocale.value.maxTags)
  }
})

const handleItem = (category): void => {
  router.push({ path: '/categories/', query: { category } })
}

const category = computed(() => {
  return router.currentRoute.value.query.category
})
</script>
<template>
  <!-- categories -->
  <section class="card-box card-wrapper categories">
    <header class="header">
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
      <li
        v-if="!props.all && categories.length > themeLocale.maxCategories"
        class="more"
      >
        <span class="more-text" @click="handleItem('all')"
          >更多
          <i class="iconfont icon-next"></i>
        </span>
      </li>
    </ul>
  </section>
</template>
