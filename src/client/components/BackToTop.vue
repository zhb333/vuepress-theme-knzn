<script setup lang="ts">
import { scrollToTop } from '../utils'
import { useScrollTop } from '../hooks'

const scrollTop = useScrollTop()
</script>
<template>
  <Transition
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown"
    mode="out-in"
  >
    <div v-show="scrollTop > 300" class="back-to-top" @click="scrollToTop">
      <i class="iconfont icon-back-to-top"></i>
    </div>
  </Transition>
</template>
