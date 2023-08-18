<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="pages">
    <HomeView />
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
