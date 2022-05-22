<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import PostInfo from './PostInfo.vue'
import type { ThemePageData } from '../../node'
import { getPostInfo } from '../utils'
import { useDarkMode, useThemeOptions } from '../hooks'
import { withBase } from '@vuepress/client'

const props = defineProps({
  post: {
    type: Object as PropType<ThemePageData>,
    required: true,
  },
  postPosition: {
    type: String,
    required: true,
  },
})

const isDarkMode = useDarkMode()

// 文章
const { post, postPosition } = toRefs(props)
const { postImage } = getPostInfo(post.value)

const themeOptions = useThemeOptions()

const postSrc = computed(() => {
  const { postImage: themePostImage, darkPostImage } = themeOptions.value
  return (
    postImage ||
    (isDarkMode.value ? darkPostImage : themePostImage) ||
    themePostImage
  )
})

const postStyle = computed(() => {
  const style = {
    'background-position': `${postPosition.value} center`, // 海报位置
  }
  if (postSrc.value) {
    style['background-image'] = `url("${withBase(postSrc.value)}")` // 海报图片
  }
  return style
})
</script>
<template>
  <div
    class="post-item card-box"
    :class="postPosition"
    :style="postStyle"
    data-aos="fade-up"
  >
    <article class="post-section">
      <header>
        <h2 class="post-title">
          <RouterLink :to="post.path">
            {{ post.title }}
          </RouterLink>
        </h2>
        <PostInfo :post="post" />
      </header>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="post-excerpt" v-html="post.excerpt"></div>
      <footer class="post-footer">
        <RouterLink :to="post.path">
          阅读更多 <i class="iconfont icon-next"></i>
        </RouterLink>
      </footer>
    </article>
  </div>
</template>
