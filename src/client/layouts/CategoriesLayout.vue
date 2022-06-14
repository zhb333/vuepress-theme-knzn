<script setup lang="ts">
import Footer from '../components/Footer.vue'
import CardCategories from '../components/CardCategories.vue'
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Pagination from '../components/Pagination.vue'
import { useTypePages } from '../hooks'

const { pages, pageList, handlePageChange, perPage, page, total } =
  useTypePages('categories', 'category')
</script>
<template>
  <main class="theme-container theme-common-container">
    <div class="theme-content">
      <aside class="theme-aside">
        <CardCategories all :pages="pages" />
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
