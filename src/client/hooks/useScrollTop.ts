/**
 * 监听滚动行为
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { getScrollTop } from '../utils'
import { debounce } from 'ts-debounce'

const scrollTop = ref(getScrollTop())

export const useScrollTop = (): Ref<number> => {
  return scrollTop
}

export const setupScrollTop = (): void => {
  const onScrollFunc = debounce(() => {
    scrollTop.value = getScrollTop()
  }, 100)

  const onScroll = (): void => {
    onScrollFunc()
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, false)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll, false)
  })
}
