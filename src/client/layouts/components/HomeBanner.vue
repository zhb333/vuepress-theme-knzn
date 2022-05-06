<script setup lang="ts">
import DecorBox from './DecorBox.vue'
import Logo from '../../components/Logo.vue'
</script>
<template>
  <div class="home-banner">
    <DecorBox>
      <template #default="{ active }">
        <div class="banner-content">
          <Transition
            enter-active-class="animate__animated animate__fadeInDown animate__fast"
            appear
          >
            <Logo v-show="active" />
          </Transition>
        </div>
      </template>
    </DecorBox>
  </div>
</template>
