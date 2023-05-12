<script setup lang="ts">
interface Props {
    loading: boolean
}

const props = defineProps<Props>()

</script>

<template>
    <transition name="fade">
        <div class="loading" v-if="props.loading">
            <div class="loading-spinner"></div>
        </div>
    </transition>
    <slot></slot>
</template>
  
<style scoped>
.loading {
    position: fixed;
    top: 3rem;
    z-index: 9999;
}

.loading-spinner {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
}

.fade-enter-active {
    transition: transform 0.2s ease-in-out;
}

.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from {
    transform: translateY(-100%);
}

.fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  