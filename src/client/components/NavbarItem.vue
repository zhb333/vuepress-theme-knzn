<script setup lang="ts">
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import type { MenuItem } from '../../node'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
})

const { item } = toRefs(props)

const handleClick = (item): void => {
  if (item.md5) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('md5', item.md5)
    }
    router.push({ path: item.link, query: { md5: item.md5 } })
  }
}
</script>
<template>
  <RouterLink :to="item.link" class="navbar-item" @click="handleClick(item)">
    <i v-if="props.icon" :class="props.icon" class="iconfont"></i>
    <span class="text">
      {{ item.text }}
    </span>
  </RouterLink>
</template>
