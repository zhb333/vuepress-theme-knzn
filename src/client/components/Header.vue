<script setup lang="ts">
import Logo from './Logo.vue'
import Navbar from './Navbar.vue'
import { toRefs } from 'vue'
const props = defineProps({
  isLogo: {
    type: Boolean,
    default: true,
  },
})

const { isLogo } = toRefs(props)
</script>
<template>
  <header class="theme-header">
    <Logo v-show="isLogo" />
    <span v-if="!isLogo"></span>
    <Navbar />
  </header>
</template>
