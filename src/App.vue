<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from '@/components/NavBar.vue'
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
