<script setup lang="ts">
import { useThemeOptions } from '../hooks'
import { computed } from 'vue'
import Medias from './Medias.vue'
const themeOptions = useThemeOptions()

const avatarSrc = computed(() => {
  return themeOptions.value.avatar
})
</script>
<template>
  <div class="avatar-wrapper card-box">
    <div class="avatar">
      <img :src="avatarSrc" alt="头像" title="头像" />
    </div>
    <div class="blogger">
      <div class="name">{{ themeOptions.blogger }}</div>
      <p class="slogan" :title="themeOptions.slogan">
        {{ themeOptions.slogan }}
      </p>
    </div>
    <Medias />
  </div>
</template>
