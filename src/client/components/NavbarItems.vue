<script setup lang="ts">
import AutoLink from './AutoLink.vue'
import NavbarDropdown from './NavbarDropdown.vue'
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'
import {
  //  isLinkHttp,
  isString,
} from '@vuepress/shared'
import { computed, toRefs } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import type { NavbarGroup, NavbarItem } from '../../node'
import type { NavMenuItem } from '../types'
import { useNavLink, useThemeLocaleData } from '../hooks'
// import { resolveRepoType } from '../utils'
import SearchBtn from './SearchBtn.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  switchFlag: {
    type: Boolean,
    default: false,
  },
})

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<NavMenuItem[]> => {
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData()

  return computed<NavMenuItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = router.currentRoute.value.path
    const currentFullPath = router.currentRoute.value.fullPath

    const languageDropdown: NavMenuItem = {
      text: themeLocale.value.selectLanguageText ?? 'unknown language',
      link: '',
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            link = targetLocalePage
          } else {
            link = targetLocalePath
          }
        }

        return {
          text,
          link,
        }
      }),
    }

    return [languageDropdown]
  })
}

/**
 * Get navbar config of repository link
 */
// const useNavbarRepo = (): ComputedRef<NavMenuItem[]> => {
//   const themeLocale = useThemeLocaleData()
//   const repo = computed(() => themeLocale.value.repo)
//   const repoType = computed(() =>
//     repo.value ? resolveRepoType(repo.value) : null
//   )

//   const repoLink = computed(() => {
//     if (repo.value && !isLinkHttp(repo.value)) {
//       return `https://github.com/${repo.value}`
//     }

//     return repo.value
//   })

//   const repoLabel = computed(() => {
//     if (!repoLink.value) return null
//     if (themeLocale.value.repoLabel) return themeLocale.value.repoLabel
//     if (repoType.value === null) return 'Source'
//     return repoType.value
//   })

//   return computed(() => {
//     if (!repoLink.value || !repoLabel.value) {
//       return []
//     }

//     return [
//       {
//         text: repoLabel.value,
//         link: repoLink.value,
//       },
//     ]
//   })
// }

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): NavMenuItem => {
  if (isString(item)) {
    return useNavLink(item)
  }
  if ((item as NavMenuItem).children) {
    return {
      ...(item as NavMenuItem),
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    }
  }
  return item as NavMenuItem
}

const useNavbarConfig = (): ComputedRef<NavMenuItem[]> => {
  const themeLocale = useThemeLocaleData()
  return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem))
}

const navbarConfig = useNavbarConfig()
const navbarSelectLanguage = useNavbarSelectLanguage()
// const navbarRepo = useNavbarRepo()
const navbarLinks = computed(() => [
  ...navbarConfig.value,
  ...navbarSelectLanguage.value,
  // ...navbarRepo.value,
])

const { show, switchFlag } = toRefs(props)

const navItemClass = computed(() => {
  // if (!switchFlag.value) return {}
  return {
    animate__backInRight: show.value,
    animate__backOutRight: !show.value,
  }
})

const navItemStyle = (index): Record<string, string> => {
  if (show.value) {
    return {
      'animation-delay': index * 100 + 'ms',
    }
  } else {
    return {
      'animation-delay': (navbarLinks.value.length - index - 1) * 100 + 'ms',
    }
  }
}
</script>

<template>
  <nav v-if="navbarLinks.length && switchFlag" class="navbar-items">
    <div class="navbar-item animate__animated" :class="navItemClass">
      <SearchBtn />
    </div>
    <div
      v-for="(item, index) in navbarLinks"
      :key="item.text"
      class="navbar-item animate__animated"
      :class="navItemClass"
      :style="navItemStyle(index)"
    >
      <NavbarDropdown v-if="item.children" :item="item" />
      <AutoLink v-else :item="item" />
    </div>
  </nav>
</template>
