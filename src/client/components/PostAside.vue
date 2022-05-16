<script setup lang="ts">
import { useMenuList } from '../hooks'
import { useRoute } from 'vue-router'
import NavbarItem from './NavbarItem.vue'
import { ref } from 'vue'

const menuList = useMenuList()
const route = useRoute()
const dirLink = ref('')

const handleDirClick = (link: string): void => {
  if (link === dirLink.value) {
    dirLink.value = ''
  } else {
    dirLink.value = link
  }
}
</script>
<template>
  <aside class="post-aside">
    <ul class="menu-list">
      <li
        v-for="item in menuList"
        :id="item.text"
        :key="item.text"
        class="menu-item"
        :class="{ active: route.path.startsWith(item.link) }"
      >
        <template v-if="item.children">
          <div class="title" @click="handleDirClick(item.link)">
            <span class="text"></span>{{ item.text }}
            <span class="arrow" :class="{ down: dirLink === item.link }"></span>
          </div>
          <ul v-show="dirLink === item.link" class="menu-sub-list">
            <li
              v-for="child of item.children"
              :id="child.text"
              :key="child.text"
              class="menu-item"
            >
              <NavbarItem :item="child" />
            </li>
          </ul>
        </template>
        <NavbarItem v-else :item="item" />
      </li>
    </ul>
  </aside>
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 100ms ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
