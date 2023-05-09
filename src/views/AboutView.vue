<script setup lang="ts">
import MessageCard from '@/components/MessageCard.vue';
import { ref } from 'vue'
const showMessage = ref(false)
const close = () => {
  showMessage.value = false
}
const open = () => {
  showMessage.value = !showMessage.value
}
</script>

<template>
  <div class="about">
    <button @click="open">Show Message</button>
    <MessageCard message="hhhh" :visible="showMessage" @close="close"/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>
