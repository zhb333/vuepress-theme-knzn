<script setup lang="ts">
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import type { MenuItem } from '../../node'
import NavbarItem from './NavbarItem.vue'

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
})

const { item } = toRefs(props)
</script>
<template>
  <div class="navbar-dropdown">
    <span class="title">{{ item.text }}</span>
    <span class="arrow"></span>
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
