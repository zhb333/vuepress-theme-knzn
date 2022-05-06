<script setup lang="ts">
import AutoLink from './AutoLink.vue'
import { computed, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavMenuItem } from '../types'
import { useClickOutside } from '../hooks'
import { isDropdownActive } from '../utils'

const props = defineProps({
  item: {
    type: Object as PropType<NavMenuItem>,
    required: true,
  },
})

const { item } = toRefs(props)

const dropdownAriaLabel = computed(() => item.value.text)

const route = useRoute()

const isActive = ref(isDropdownActive(item.value, route.path))

const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
  arr[arr.length - 1] === item

const open = ref(false)
const dropdownRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(dropdownRef)

watch(
  () => route.path,
  () => {
    open.value = false
    isActive.value = isDropdownActive(item.value, route.path)
  }
)

const handleDropdown = (e): void => {
  open.value = !open.value
}

watch(isClickOutside, () => {
  if (open.value && isClickOutside.value) {
    open.value = false
  }
})

const arrowClasses = computed(() => {
  return {
    down: !open.value,
    up: open.value,
  }
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="navbar-dropdown-wrapper"
    :class="{ open, isActive }"
  >
    <span
      class="navbar-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="arrowClasses" />
    </span>

    <Transition name="slide-fade">
      <ul v-show="open" class="navbar-dropdown">
        <li
          v-for="child in item.children"
          :key="child.text"
          class="navbar-dropdown-item"
        >
          <template v-if="child.children">
            <h4 class="navbar-dropdown-subtitle">
              <AutoLink v-if="child.link" :item="child" />

              <span v-else>{{ child.text }}</span>
            </h4>

            <ul class="navbar-dropdown-subitem-wrapper">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="navbar-dropdown-subitem"
              >
                <AutoLink
                  :item="grandchild"
                  @focusout="
                    isLastItemOfArray(grandchild, child.children ?? []) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <AutoLink
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss">
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: var(--t-transform);
}

.slide-fade-leave-active {
  transition: var(--t-transform);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
