<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, toRefs } from 'vue'
import type { MenuItem } from '../../node'
import NavbarItem from './NavbarItem.vue'

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
})

const { item } = toRefs(props)

const isDown = ref(false)

const handleToggle = (): void => {
  isDown.value = !isDown.value
}
</script>
<template>
  <div class="navbar-dropdown" :class="{ down: isDown }">
    <div class="dropdown-header" @click="handleToggle">
      <span class="title">{{ item.text }}</span>
      <span class="arrow"></span>
    </div>
    <ul class="navbar-dropdown-subitem-wrapper">
      <li
        v-for="child in item.children"
        :key="child.text"
        class="navbar-dropdown-subitem"
      >
        <NavbarItem :item="child"></NavbarItem>
      </li>
    </ul>
  </div>
</template>
