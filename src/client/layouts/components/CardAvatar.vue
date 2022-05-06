<script setup lang="ts">
import { useThemeLocaleData, useThemeMode } from '../../hooks'
import avatarImg from '../../assets/images/avatar.svg'
import { computed } from 'vue'
import Medias from './Medias.vue'
const themeLocale = useThemeLocaleData()

const themeMode = useThemeMode()

const avatarSrc = computed(() => {
  return (
    themeLocale.value.palettes?.[themeMode.value]?.avatar ||
    themeLocale.value.avatar ||
    avatarImg
  )
})
</script>
<template>
  <div class="avatar-wrapper card-box">
    <div class="avatar">
      <img :src="avatarSrc" alt="头像" title="头像" />
    </div>
    <div class="blogger">
      <div class="name">{{ themeLocale.blogger }}</div>
      <p class="slogan" :title="themeLocale.slogan">
        {{ themeLocale.slogan }}
      </p>
    </div>
    <Medias />
  </div>
</template>
