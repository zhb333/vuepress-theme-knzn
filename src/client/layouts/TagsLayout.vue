<script setup lang="ts">
import Footer from '../components/Footer.vue'
import CardTags from '../components/CardTags.vue'
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Pagination from '../components/Pagination.vue'
import { useTypePages } from '../hooks'

const { pages, pageList, handlePageChange, perPage, page, total } =
  useTypePages('tags', 'tag')
</script>
<template>
  <main class="theme-container theme-common-container">
    <div class="theme-content">
      <aside class="theme-aside">
        <CardTags all :pages="pages" />
      </aside>
      <!-- 文章列表 -->
      <div class="theme-wrapper">
        <PostList ref="PostListRef" :pages="pageList" />
        <Pagination
          v-show="total > perPage"
          :per-page="perPage"
          :page="page"
          :total="total"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </main>
  <Footer />
  <BackToTop />
</template>
