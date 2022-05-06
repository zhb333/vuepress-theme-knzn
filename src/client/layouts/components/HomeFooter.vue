<script setup lang="ts">
import DecorBox from './DecorBox.vue'
import Medias from './Medias.vue'
import CommonFooter from './CommonFooter.vue'
</script>
<template>
  <footer class="home-footer">
    <DecorBox position="top">
      <template #default="{ active }">
        <div class="footer-content">
          <Transition enter-active-class="animate__animated animate__zoomIn">
            <Medias v-show="active" />
          </Transition>
          <Transition
            enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
          >
            <CommonFooter v-show="active"> </CommonFooter>
          </Transition>
        </div>
      </template>
    </DecorBox>
  </footer>
</template>
