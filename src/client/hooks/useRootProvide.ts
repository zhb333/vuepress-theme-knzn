import { computed, inject, provide, ref } from 'vue'
import type { InjectionKey, WritableComputedRef } from 'vue'
// import type { LayoutTypes } from '../types'

export const useRootProvide = <T>(
  initVal: T,
  symbolDesc = initVal
): {
  useValue(): WritableComputedRef<T>
  setupValue(): void
} => {
  const value = ref<T>(initVal)
  type ValueRef = WritableComputedRef<T>
  const valueSymbol: InjectionKey<ValueRef> = Symbol(String(symbolDesc))

  const useValue = (): ValueRef => {
    const target = inject(valueSymbol)
    if (!target) {
      throw new Error(
        `useRootProvide() with ${initVal} is called without provider.`
      )
    }
    return target
  }

  const setupValue = (): void => {
    const target = computed({
      get() {
        return value.value
      },
      set(val) {
        value.value = val
      },
    })

    provide(valueSymbol, target as ValueRef)
  }

  return {
    useValue,
    setupValue,
  }
}

// export const { useValue: useCurrentLayout, setupValue: setupCurrentLayout } =
//   useRootProvide<LayoutTypes>('HomeLayout')

// export const { useValue: useHomeLayout, setupValue: setupHomeLayout } =
//   useRootProvide<HomeLayoutTypes>('Home')
