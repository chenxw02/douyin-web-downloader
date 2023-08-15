<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/NavBar.vue';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });
</script>

<template>
  <Navbar />
  <div class="pages">
    <RouterView />
  </div>
</template>

<style scoped>
.pages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: max-content;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
