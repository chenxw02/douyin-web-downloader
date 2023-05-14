<script setup lang="ts">
import { computed, ref } from 'vue';
import JSConfetti from 'js-confetti'
import { singleRequest, download_one, muti_url } from '@/service/singleRequest';
import LoadAni from '@/components/LoadAni.vue';
import MessageCard from '@/components/MessageCard.vue';
import { Type } from '@/components/interface/enums';
import VideoPlayer from '@/components/VideoPlayer.vue';

const inputURL = ref('')
const jsConfetti = new JSConfetti()
const images = ref<any>([])
const desc = ref('')
const video = ref('')
const message = ref('')
let imageCount = 0
const loading = ref(false)
const showGallery = ref(false)

async function submit() {
  const response = await singleRequest(inputURL.value)
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

const tell = async () => {
  const urls = inputURL.value.split('\n')
  if (inputURL.value.length === 0) {
    message.value = 'Please input your URL'
    return
  } else if (urls.length === 1) {
    handle_single_url()
    return
  } else {
    console.log('muti')
    hanle_multi_url()
    return
  }
}

const handle_single_url = async () => {
  showGallery.value = false
  loading.value = true
  images.value = []
  video.value = ''
  const res = await singleRequest(inputURL.value)
  const data = res?.data
  if (res?.status !== 200) {
    loading.value = false
    message.value = 'Please check your URL'
    return
  }
  desc.value = data['desc']
  console.log(desc.value)
  if (data['type'] === 'images' && data['urls']) {
    for (let i = 0; i < data['urls'].length; i++) {
      images.value.push(data['urls'][i])
    }
  } else if (data['type'] === 'video' && data['urls']) {
    video.value = data['urls'][0]
  }
}

const hanle_multi_url = async () => {
  loading.value = true
  const res = await muti_url(inputURL.value)

  if (res?.status !== 200) {
    loading.value = false
    message.value = 'Please check your URL'
    return
  } else {
    loading.value = false
    jsConfetti.addConfetti()
    const fileName = res?.headers['content-disposition'].split('filename=')[1].replace('../mixed/', '')
    const url = window.URL.createObjectURL(new Blob([res?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 从 DOM 中删除 a 标签
    window.URL.revokeObjectURL(url); // 释放 URL 对象占用的内存
  }
}


const download = async () => {
  loading.value = true
  const res = await download_one(inputURL.value)

  if (res?.status !== 200) {
    loading.value = false
    message.value = 'Please check your URL'
    return
  } else {
    loading.value = false
    jsConfetti.addConfetti()
    const fileName = res?.headers['content-disposition'].split('utf-8\'\'')[1]
    const fileNameDecoded = decodeURIComponent(fileName);
    const url = window.URL.createObjectURL(new Blob([res?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileNameDecoded);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

const onImageLoad = () => {
  // count.value += 1
  imageCount += 1
  if (imageCount === images.value.length) {
    jsConfetti.addConfetti()
    loading.value = false
    showGallery.value = true
    imageCount = 0
  }
}

const onVideoLoaded = () => {
  console.log('video loaded')
  jsConfetti.addConfetti()
  loading.value = false
  showGallery.value = true
}

</script>

<template>
  <LoadAni :loading="loading" />
  <MessageCard :message="message" :visible="message !== ''" @close="message = ''" />
  <div class="intro">
    <h1>Douyin Downloader</h1>
  </div>
  <div class="main-input">
    <textarea v-model="inputURL" placeholder="Paste your URL here" rows="10" cols="50"></textarea>
    <div class="submit">
      <button @click="tell">GO</button>
    </div>
  </div>
  <div class="gallery" v-if="images.length > 0 || video.length > 0" v-show="showGallery">
    <div class="gallery-info">
      <span>{{ desc }}</span>
      <img src="../assets/icons/download.png" alt="download" @click="download" />
    </div>
    <div class="gallery-content">
      <div class="gallery-image" v-if="images.length > 0">
        <div v-for="image in images" :key="image" class="image-item">
          <img :src="image" alt="image" @load="onImageLoad" />
        </div>
      </div>
      <div v-if="video" class="gallery-video">
        <VideoPlayer :url="video" @onVideoLoaded="onVideoLoaded" />
      </div>
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
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem 0;
}

.gallery-info {
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
}

.gallery-info span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
}

.gallery-info img {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  margin-right: 0.2rem;
  margin-left: 2rem;
}

.gallery-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gallery-image {
  column-count: 2;
}

.gallery-video {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

  .gallery {
    width: 80%;
  }
}
</style>
