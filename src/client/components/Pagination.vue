<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { scrollToTop } from '../utils'

const emit = defineEmits(['page-change'])

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
})

const { total, page, perPage } = toRefs(props)
const totalPages = computed(() => Math.ceil(total.value / perPage.value))
const beforePage = computed(() => page.value - 1)
const afterPage = computed(() => page.value + 1)
type PageItem = { label: string | number; type: string }
const pages = computed(() => {
  const list: PageItem[] = []
  for (let pageNum = beforePage.value; pageNum <= afterPage.value; pageNum++) {
    if (pageNum < 1 || pageNum > totalPages.value) continue
    list.push({
      label: pageNum,
      type: 'numb',
    })
  }
  if (page.value > 3) {
    list.unshift({ label: '...', type: 'dots' })
  }
  if (page.value > 2) {
    list.unshift({ label: 1, type: 'numb' })
  }

  if (page.value < totalPages.value - 2) {
    list.push({ label: '...', type: 'dots' })
  }

  if (page.value < totalPages.value - 1) {
    list.push({ label: totalPages.value, type: 'numb' })
  }
  return list
})

const handlePageChange = (num: PageItem['label']): void => {
  if (num < 1 || num > totalPages.value) return
  emit('page-change', num)
  setTimeout(() => scrollToTop(), 100)
}
</script>
<template>
  <div class="pagination">
    <div
      :disabled="page === 1"
      class="btn prev"
      @click="handlePageChange(page - 1)"
    >
      <span><i class="iconfont icon-prev"></i> Prev</span>
    </div>

    <ul>
      <li
        v-for="(item, index) of pages"
        :key="index"
        :class="[{ active: item.label === page }, item.type]"
        @click="handlePageChange(item.label)"
      >
        <span>{{ item.label }}</span>
      </li>
    </ul>
    <div
      :disabled="page === totalPages"
      class="btn next"
      @click="handlePageChange(page + 1)"
    >
      <span>Next <i class="iconfont icon-next"></i> </span>
    </div>
  </div>
</template>
