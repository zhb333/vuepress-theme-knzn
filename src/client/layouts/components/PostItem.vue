<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { ThemePageData } from '../../../node'
import { usePageInfo, useThemeLocaleData, useThemeMode } from '../../hooks'
import postImg from '../../assets/images/post.svg'

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

// 文章
const { post, postPosition } = toRefs(props)
const { frontmatter, author, date, tags, categories } = usePageInfo(post.value)

const themeLocale = useThemeLocaleData()
const themeMode = useThemeMode()
const postSrc = computed(() => {
  return (
    frontmatter.postImage ||
    themeLocale.value.palettes?.[themeMode.value]?.postImage ||
    themeLocale.value.postImage ||
    postImg
  )
})
const postStyle = computed(() => {
  return {
    'background-image': `url("${postSrc.value}")`, // 海报图片
    'background-position': `${postPosition.value} center`, // 海报位置
  }
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
        <div class="post-info">
          <span class="post-info-item">
            <i class="iconfont icon-avatar" title="作者"></i>
            {{ author }}</span
          >
          <span class="post-info-item">
            <i class="iconfont icon-datetime" title="日期"></i>
            {{ date }}</span
          >
          <span v-if="categories!.length" class="post-info-item">
            <i class="iconfont icon-categorynormal" title="分类"></i>
            <i v-for="text of categories" :key="text" class="post-type">{{
              text
            }}</i>
          </span>
          <span v-if="tags!.length" class="post-info-item">
            <i class="iconfont icon-tag" title="标签"></i>
            <i v-for="text of tags" :key="text" class="post-type">{{ text }}</i>
          </span>
        </div>
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
