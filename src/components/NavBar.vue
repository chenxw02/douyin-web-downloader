<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="nav-bar">
        <div class="nav-item">
            <RouterLink to="/">Home</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink to="/about">About</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: right;
    height: 3rem;
    z-index: 100;
    width: 100%;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 0 1rem 0 0;
}
</style>