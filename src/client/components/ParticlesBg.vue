<script setup lang="ts">
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { particlesOptions } from '../utils'
import { useThemeOptions } from '../hooks'
import { computed, ref, watch } from 'vue'

const themeOptions = useThemeOptions()

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine)
}

const particlesLoaded = (container: Container): void => {
  if (container.canvas && container.canvas.element) {
    container.canvas.element.style.zIndex = '-1'
  }
}

const switchFlag = ref(true)

const options = computed(() => {
  return themeOptions.value.particlesOptions || particlesOptions
})

watch(options, (val) => {
  if (val) {
    switchFlag.value = false
    setTimeout(() => (switchFlag.value = true), 10)
  }
})
</script>
<template>
  <Particles
    v-if="switchFlag"
    id="tsparticles"
    :particles-loaded="particlesLoaded"
    :particles-init="particlesInit"
    :options="options"
  />
</template>
