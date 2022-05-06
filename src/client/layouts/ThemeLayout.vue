<script setup lang="ts"></script>
<template>
  <div class="theme-layout">
    <slot name="background"></slot>
    <slot name="banner"></slot>
    <main class="theme-content">
      <div class="theme-container">
        <slot name="aside"></slot>
        <div class="theme-inner-content">
          <slot name="default"></slot>
        </div>
      </div>
    </main>
    <slot name="footer"></slot>
  </div>
</template>
