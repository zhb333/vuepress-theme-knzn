<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { Ref } from 'vue'
import NavbarItems from './NavbarItems.vue'
import Logo from './Logo.vue'
import SearchBtn from './SearchBtn.vue'

const layout = inject('layout') as Ref<string>

const isNavShow = ref(false)
const navAnimateSwitch = ref(false)
const toggleNavShow = (): void => {
  isNavShow.value = !isNavShow.value
  navAnimateSwitch.value = true
}

const scrollTop = inject('scrollTop') as Ref<number>
const isNavActive = computed(
  () => layout.value === 'HomeLayout' && scrollTop.value < 300
)

watch(
  isNavActive,
  () => {
    if (!isNavShow.value) {
      isNavShow.value = true
    }
    if (!navAnimateSwitch.value) {
      navAnimateSwitch.value = true
    }
  },
  { immediate: true }
)
</script>

<template>
  <header class="navbar" :class="{ active: isNavActive }">
    <SearchBtn />
    <Logo />
    <nav class="right">
      <NavbarItems :show="isNavShow" :switch-flag="navAnimateSwitch" />
      <Transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__rotateOut"
        mode="out-in"
      >
        <span
          v-if="!isNavShow"
          class="iconfont icon-menu menu-button"
          @click="toggleNavShow"
        ></span>
        <span
          v-else
          class="iconfont icon-INNER_DOOR_WALLBOARD close-button"
          @click="toggleNavShow"
        ></span>
      </Transition>
    </nav>
  </header>
</template>
