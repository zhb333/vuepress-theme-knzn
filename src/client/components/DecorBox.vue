<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { assetScrollToBottom, assetScrollToTop } from '../utils'
import { useScrollTop } from '../hooks'
const props = defineProps({
  position: {
    type: String as PropType<'bottom' | 'top'>,
    default: 'bottom',
  },
})
const scrollTop = useScrollTop()

const isShow = computed(() => {
  return props.position === 'bottom'
    ? assetScrollToTop(scrollTop.value)
    : assetScrollToBottom(scrollTop.value)
})
</script>
<template>
  <section class="decor-box">
    <slot :active="isShow" />
    <svg
      class="decor"
      :class="props.position"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        appear
      >
        <path v-show="isShow" class="left left-1" d="M0 0 L50 50 L0 100"></path>
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        appear
      >
        <path
          v-show="isShow"
          class="right right-1"
          d="M100 0 L50 50 L100 100"
        ></path>
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-p7"
        appear
      >
        <path
          v-show="isShow"
          class="left left-2"
          d="M0 100 L50 50 L0 33.3"
        ></path>
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-p7"
        appear
      >
        <path
          v-show="isShow"
          class="right right-2"
          d="M100 100 L50 50 L100 33.3"
        ></path>
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-p8"
        appear
      >
        <path
          v-show="isShow"
          class="left left-3"
          d="M0 100 L50 50 L0 66.6"
        ></path>
      </Transition>
      <Transition
        enter-active-class="animate__animated animate__fadeInUp animate__delay-p8"
        appear
      >
        <path
          v-show="isShow"
          class="right right-3"
          d="M100 100 L50 50 L100 66.6"
        ></path>
      </Transition>
      <path class="center" d="M0 99.9 L50 49.9 L100 99.9 L0 99.9"></path>
      <path class="center" d="M48 52 L50 49 L52 52 L48 52"></path>
    </svg>
  </section>
</template>
