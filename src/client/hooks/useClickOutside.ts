import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

export const useClickOutside = (
  elementRef: Ref<null | HTMLElement>
): Ref<boolean> => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent): void => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
