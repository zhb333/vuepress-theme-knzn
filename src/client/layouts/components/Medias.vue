<script setup lang="ts">
import { useThemeLocaleData } from '../../hooks'
const themeLocale = useThemeLocaleData()
</script>
<template>
  <div class="medias">
    <a
      v-for="media of themeLocale.medias"
      :key="media.icon"
      class="iconfont"
      :class="`icon-${media.icon}`"
      :href="media.link"
      :title="media.icon"
      target="_blank"
    ></a>
  </div>
</template>
