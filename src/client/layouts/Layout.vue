<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import DecorBox from '../components/DecorBox.vue'
import CardAvatar from '../components/CardAvatar.vue'
import { useLayout, useThemeOptions } from '../hooks'
import { computed } from 'vue'
const themeOptions = useThemeOptions()
const contianerStyle = computed(() => {
  return {
    'background-image': `url("${themeOptions.value.backgroundImage}")`,
  }
})

const layout = useLayout()
</script>
<template>
  <Header />
  <div class="theme-background" :style="contianerStyle"></div>
  <DecorBox />
  <main class="theme-container">
    <div class="theme-content">
      <aside class="theme-aside">
        <CardAvatar />
      </aside>
      <section class="posts-wrapper">{{ layout }}</section>
    </div>
  </main>
  <DecorBox position="top">
    <Footer class="home-footer" />
  </DecorBox>
</template>
