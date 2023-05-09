<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
    visible: boolean,
    message: string
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

const close = () => {
    emits('close')
}
</script>

<template>
    <transition name="fade">
        <div class="message-box" v-if="props.visible">
            <div class="message-box__content">
                <p class="message-box__text">{{ props.message }}</p>
                <button class="message-box__button" @click="close">OK</button>
            </div>
        </div>
    </transition>
</template>
  
<style scoped>
.message-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message-box__content {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.message-box__text {
    color: black;
    margin-bottom: 10px;
}

.message-box__button {
    padding: 8px 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  