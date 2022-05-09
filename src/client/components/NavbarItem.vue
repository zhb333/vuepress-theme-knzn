<script setup lang="ts">
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import type { MenuItem } from '../../node'

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
</script>
<template>
  <RouterLink :to="item.link" class="navbar-item">
    <i v-if="props.icon" :class="props.icon" class="iconfont"></i>
    {{ item.text }}</RouterLink
  >
</template>
