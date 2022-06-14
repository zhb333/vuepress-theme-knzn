<script setup lang="ts">
import Logo from './Logo.vue'
import Navbar from './Navbar.vue'
import { computed, toRefs } from 'vue'
import { assetScrollToTop } from '../utils'
import { useScrollTop } from '../hooks/useScrollTop'
import { useLayout } from '../hooks/useLayout'

const layout = useLayout()
const scrollTop = useScrollTop()
const isActiveCls = computed(
  () =>
    ['HomeLayout', 'PostsLayout', 'SearchLayout'].includes(layout.value) &&
    assetScrollToTop(scrollTop.value)
)
const isLogo = computed(() =>
  layout.value === 'HomeLayout' ? !isActiveCls.value : true
)
</script>
<template>
  <header
    class="theme-header"
    :is-logo="!isActiveCls"
    :class="{ active: isActiveCls }"
  >
    <Logo v-show="isLogo" />
    <span v-if="!isLogo"></span>
    <Navbar />
  </header>
</template>
