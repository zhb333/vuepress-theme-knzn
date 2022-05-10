<script setup lang="ts">
import { useThemeOptions } from '../hooks'
import type { PropType } from 'vue'
import { ref, toRefs, watch } from 'vue'
import type { ThemePageData } from '../../node'
import PostItem from './PostItem.vue'
import Pagination from './Pagination.vue'

const props = defineProps({
  pages: {
    type: Array as PropType<ThemePageData[]>,
    required: true,
  },
})

const { pages } = toRefs(props)
const pageList = ref<ThemePageData[]>([])
const themeLocale = useThemeOptions()

const perPage = themeLocale.value.perPage || 10
const page = ref(1)
const total = ref(pages.value.length)

getPages()

function getPages(): void {
  const skip = (page.value - 1) * perPage
  pageList.value = pages.value.slice(skip, skip + perPage)
  total.value = pages.value.length
}

const handlePageChange = (num): void => {
  page.value = num
  getPages()
}

watch(pages, getPages)
</script>
<template>
  <div class="post-list">
    <template v-if="pageList.length">
      <PostItem
        v-for="(post, index) of pageList"
        :key="post.key"
        :post="post"
        :post-position="index % 2 === 0 ? 'right' : 'left'"
      />
    </template>
    <div v-else class="empty">
      <i class="iconfont icon-empty"></i>
      <span> 暂无匹配内容 </span>
    </div>
    <Pagination
      v-show="pageList.length"
      :per-page="perPage"
      :page="page"
      :total="total"
      @page-change="handlePageChange"
    />
  </div>
</template>
