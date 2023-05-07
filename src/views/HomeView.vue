<script setup lang="ts">
import { ref, onMounted} from 'vue';
import VueConfetti from 'vue-confetti';
import JSConfetti from 'js-confetti'

const url = ref('')
const jsConfetti = new JSConfetti()
const submit = () => {
  console.log(url.value)
  jsConfetti.addConfetti()
}

const vueConfetti = ref<VueConfetti>(null)

const startConfetti = () => {
  vueConfetti.value?.start()
  console.log('start')
  
}
</script>

<template>
  <div class="intro">
    <h1 @click="startConfetti">Douyin Downloader</h1>
  </div>
  <div class="main-input">
    <textarea
      v-model="url"
      placeholder="Paste your URL here"
      rows="10"
      cols="50"></textarea>
    <div class="submit">
      <button @click="submit">GO></button>
    </div>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 0 0 0;
}

.intro h1 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(to right, rgba(77, 165, 247, 1), rgb(241, 153, 124));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.main-input {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: stretch;
  width: fit-content;
  margin: 3rem 0;
}

.main-input textarea {
  border: 0.5rem solid #ffffff;
  border-radius: 0.3rem;
  resize: none;
  outline: none;
  animation: shadow-pulse 1s infinite;
}

.main-input textarea:not(:placeholder-shown) {
  box-shadow: 0 0 0 2px rgb(77, 165, 247);
  animation: none;
}

@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 2px rgb(77, 165, 247);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(51, 204, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 2px rgb(77, 165, 247);
  }
}

.submit {
  width: 100%;
  margin-top: 1rem;
}

@media screen and (max-width: 800px) {
  .main-input {
    width: 80%;
  }
}
</style>
