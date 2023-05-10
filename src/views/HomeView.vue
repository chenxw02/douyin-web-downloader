<script setup lang="ts">
import { ref} from 'vue';
import JSConfetti from 'js-confetti'
import { singleRequest } from '@/service/singleRequest';
import LoadAni from '@/components/LoadAni.vue';
import MessageCard from '@/components/MessageCard.vue';
import { Type } from '@/components/interface/enums';

const url1 = ref('')
const jsConfetti = new JSConfetti()
const images = ref<any>([])
const video = ref('')
const message = ref('')
let imageCount = 0
const Loading = ref(false)

async function submit() {
  const response = await singleRequest(url1.value)
  if (response?.data) {
    jsConfetti.addConfetti()
    const fileName = response?.headers['content-disposition'].split('utf-8\'\'')[1]
    const fileNameDecoded = decodeURIComponent(fileName);
    console.log(fileNameDecoded)
    const url = window.URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileNameDecoded);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 从 DOM 中删除 a 标签
    window.URL.revokeObjectURL(url); // 释放 URL 对象占用的内存
  }
}

async function go() {
  Loading.value = true
  images.value = []
  video.value = ''
  const res = await singleRequest(url1.value)
  const data = res?.data
  if(res?.status !== 200) {
    Loading.value = false
    message.value = 'Please check your URL'
    return
  }
  if (data['type'] === 'images' && data['urls']) {
    for (let i = 0; i < data['urls'].length; i++) {
      images.value.push(data['urls'][i])
    }
    console.log(images.value)
  } else if (data['type'] === 'video' && data['urls']) {
    video.value = data['urls'][0]
    console.log(video.value)
  }
}

const onImageLoad = () => {
  // count.value += 1
  imageCount += 1
  if (imageCount === images.value.length) {
    jsConfetti.addConfetti()
    Loading.value = false
    imageCount = 0
  }
}
</script>

<template>
    <LoadAni v-if="Loading" />
    <MessageCard :message="message" :visible="message !== ''" @close="message = ''"/>
    <div class="intro" v-show="!Loading">
      <h1>Douyin Downloader</h1>
    </div>
    <div class="main-input" v-show="!Loading">
      <textarea v-model="url1" placeholder="Paste your URL here" rows="10" cols="50"></textarea>
      <div class="submit">
        <button @click="go">GO</button>
      </div>
    </div>
    <div class="gallery-info">
        <span>Click to download</span>
    </div>
    <div class="gallery" v-if="images.length > 0 || video.length > 0" v-show="!Loading">
      <div v-if="images.length > 0">
        <div v-for="image in images" :key="image" class="image-item">
          <img :src="image" alt="image" @load="onImageLoad" />
        </div>
      </div>
      <div v-if="video">
        <!-- <video :src="videos" controls="controls" autoplay="autoplay" loop="loop" muted="muted"></video> -->
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
  color: #ffffff;
  /* background: linear-gradient(to right, rgba(77, 165, 247, 1), rgb(241, 153, 124));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

.main-input {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: stretch;
  width: 45%;
  margin: 3rem 0 2rem 0;
}

.main-input textarea {
  height: 20vh;
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

.gallery {
  width: 45%;
  column-count: 2;
  margin: 0 0 2rem 0;
}

.gallery-info {
  width: 45%;
  /* 从右侧开始排列 */
  float: right;
  text-align: right;
  margin: 0 0 1rem 0;
}

.image-item {
  max-width: 100%;
  margin: 0 0 1rem 0;
}

.image-item img {
  width: 100%;
  border-radius: 0.5rem;
}

@media screen and (max-width: 800px) {
  .main-input {
    width: 80%;
  }

  .gallery-info {
    width: 80%;
  }

  .gallery {
    width: 80%;
  }
}
</style>
