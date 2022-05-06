<script setup lang="ts">
import PostList from './components/PostList.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeFooter from './components/HomeFooter.vue'
import ThemeLayout from './ThemeLayout.vue'
import CardAvatar from './components/CardAvatar.vue'
import CardCategories from './components/CardCategories.vue'
import CardTags from './components/CardTags.vue'
import ThemeBackground from './components/ThemeBackground.vue'

import { usePages } from '../hooks'
import ParticlesBg from './components/ParticlesBg.vue'
const pages = usePages()
</script>
<template>
  <ThemeLayout>
    <template #background>
      <ThemeBackground />
      <ParticlesBg />
    </template>
    <template #banner>
      <HomeBanner />
    </template>
    <template #aside>
      <div class="theme-aside">
        <CardAvatar />
        <CardCategories :pages="pages" />
        <CardTags :pages="pages" />
      </div>
    </template>
    <template #default>
      <PostList :pages="pages" />
    </template>
    <template #footer>
      <HomeFooter />
    </template>
  </ThemeLayout>
</template>
