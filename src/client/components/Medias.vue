<script setup lang="ts">
import { useThemeOptions } from '../hooks'
const themeOptions = useThemeOptions()
</script>
<template>
  <div class="medias">
    <a
      v-for="media of themeOptions.medias"
      :key="media.icon"
      class="iconfont"
      :class="`icon-${media.icon}`"
      :href="media.link"
      :title="media.icon"
      target="_blank"
    ></a>
  </div>
</template>
