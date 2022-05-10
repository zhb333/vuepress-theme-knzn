<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import DecorBox from '../components/DecorBox.vue'
import CardAvatar from '../components/CardAvatar.vue'
import CardCategories from '../components/CardCategories.vue'
import CardTags from '../components/CardTags.vue'
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Logo from '../components/Logo.vue'
import Medias from '../components/Medias.vue'
import ParticlesBg from '../components/ParticlesBg.vue'
import { usePages, useScrollTop, useThemeOptions } from '../hooks'
import { computed } from 'vue'
import { assetScrollToTop } from '../utils'
const themeOptions = useThemeOptions()
const scrollTop = useScrollTop()
const contianerStyle = computed(() => {
  return {
    'background-image': `url("${themeOptions.value.backgroundImage}")`,
  }
})
const isActiveCls = computed(() => assetScrollToTop(scrollTop.value))

const pages = usePages()
</script>
<template>
  <Header :is-logo="!isActiveCls" :class="{ active: isActiveCls }" />
  <div class="theme-background" :style="contianerStyle"></div>
  <ParticlesBg />
  <DecorBox v-slot="{ active }">
    <div class="banner-content">
      <Transition
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        appear
      >
        <Logo v-show="active" />
      </Transition>
    </div>
  </DecorBox>
  <main class="theme-container">
    <div class="theme-content">
      <aside class="theme-aside">
        <CardAvatar />
        <CardCategories :pages="pages" />
        <CardTags :pages="pages" />
      </aside>
      <PostList :pages="pages" />
    </div>
  </main>
  <DecorBox position="top">
    <template #default="{ active }">
      <div class="footer-content">
        <Transition enter-active-class="animate__animated animate__fadeInDown">
          <Medias v-show="active" />
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <Footer v-show="active" class="home-footer" />
        </Transition>
      </div>
    </template>
  </DecorBox>
  <BackToTop />
</template>
