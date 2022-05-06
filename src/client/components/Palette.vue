<script setup lang="ts">
import { useThemeMode } from '../hooks'
const themeMode = useThemeMode()
const themes = [
  { theme: 'light', icon: 'icon-sun', text: '浅色模式' },
  { theme: 'dark', icon: 'icon-night', text: '深色模式' },
  { theme: 'green', icon: 'icon-eye', text: '护眼模式' },
  { theme: 'yellow', icon: 'icon-book', text: '阅读模式' },
]
</script>
<template>
  <div class="palette setting-btn">
    <i class="iconfont icon-palette"></i>
    <ul class="select-box card-box">
      <li
        v-for="item of themes"
        :key="item.theme"
        class="iconfont item"
        :class="[item.icon, { active: item.theme === themeMode }]"
        @click="themeMode = item.theme"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>
