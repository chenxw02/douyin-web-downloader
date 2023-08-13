<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, watch } from 'vue'

import { Type } from './interface/enums'

interface Props {
    visible: boolean,
    message: string,
    type?: Type
}

const props = withDefaults(defineProps<Props>(), {
    type: Type.NORMAL
})

const emits = defineEmits(['close']);

const close = () => {
    emits('close')
}

watch(() => props.visible, (val) => {
    setTimeout(() => {
        if (val) {
            close()
        }
    }, 1000)
})
</script>

<template>
    <transition name="fade">
        <div class="message-box" v-if="props.visible">
            <div class="message-box__content">
                <p class="message-box__symbol">{{ props.type }}</p>
                <p class="message-box__text">{{ props.message }}</p>
            </div>
        </div>
    </transition>
</template>
  
<style scoped>
.message-box {
    z-index: 9999;
    position: fixed;
    top: 3rem;
}

.message-box__content {
    display: flex;
    width: fit-content;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.message-box__symbol {
    padding-right: 5px;
}

.message-box__text {
    color: black;
    font-weight: 500;
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
</style>
  