<script setup lang="ts">
import { ref } from 'vue';
import JSConfetti from 'js-confetti';
import { geta, singleRequest } from '@/service/data';
import LoadAni from '@/components/LoadAni.vue';
import MessageCard from '@/components/MessageCard.vue';
import { ElMessage } from 'element-plus';

const inputURL = ref('');
const jsConfetti = new JSConfetti();
const images = ref<any>([]);
const desc = ref('');
const video = ref('');
const message = ref('');
let imageCount = 0;
const loading = ref(false);
const showGallery = ref(false);

async function submit() {
  const response = await singleRequest(inputURL.value);
  if (response?.data) {
    jsConfetti.addConfetti();
    const fileName =
      response?.headers['content-disposition'].split("utf-8''")[1];
    const fileNameDecoded = decodeURIComponent(fileName);
    console.log(fileNameDecoded);
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
  const urls = inputURL.value.split('\n');
  if (inputURL.value.length === 0) {
    message.value = 'Please input your URL';
    return;
  } else if (urls.length === 1) {
    handle_single_url();
    return;
  } else {
    console.log('muti');
    hanle_multi_url();
    return;
  }
};

const handle_single_url = async () => {
  showGallery.value = false;
  loading.value = true;
  images.value = [];
  video.value = '';
  try {
    const params = {
      link: inputURL.value,
    };
    const data = await geta(params);
    desc.value = data['desc'];
    if (data['type'] === 'images' && data['urls']) {
      for (let i = 0; i < data['urls'].length; i++) {
        images.value.push(data['urls'][i]);
      }
    } else if (data['type'] === 'video' && data['urls']) {
      video.value = data['urls'][0];
    }
  } catch (error) {
    // console.log(error);
  }
};

const hanle_multi_url = async () => {
  loading.value = true;
  const res = await muti_url(inputURL.value);

  if (res?.status !== 200) {
    loading.value = false;
    message.value = 'Please check your URL';
    return;
  } else {
    loading.value = false;
    jsConfetti.addConfetti();
    const fileName = res?.headers['content-disposition']
      .split('filename=')[1]
      .replace('../mixed/', '');
    const url = window.URL.createObjectURL(new Blob([res?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 从 DOM 中删除 a 标签
    window.URL.revokeObjectURL(url); // 释放 URL 对象占用的内存
  }
};

const download = async () => {
  loading.value = true;
  const res = await download_one(inputURL.value);

  if (res?.status !== 200) {
    loading.value = false;
    message.value = 'Please check your URL';
    return;
  } else {
    loading.value = false;
    jsConfetti.addConfetti();
    const fileName = res?.headers['content-disposition'].split("utf-8''")[1];
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
};

const onImageLoad = () => {
  // count.value += 1
  imageCount += 1;
  if (imageCount === images.value.length) {
    jsConfetti.addConfetti();
    loading.value = false;
    showGallery.value = true;
    imageCount = 0;
  }
};

const onVideoLoaded = () => {
  console.log('video loaded');
  jsConfetti.addConfetti();
  loading.value = false;
  showGallery.value = true;
};
</script>

<template>
  <LoadAni :loading="loading" />
  <MessageCard
    :message="message"
    :visible="message !== ''"
    @close="message = ''"
  />
  <div class="home">
    <div class="title">Douyin Downloader</div>
    <div class="main">
      <textarea
        v-model="inputURL"
        placeholder="Paste your URL here"
        rows="10"
        cols="50"
      ></textarea>
      <button @click="tell">GO</button>
    </div>
    <div class="gallery">
      <div class="desc">{{ desc }}</div>
      <div class="images" v-if="images.length">
        <img v-for="image in images" :key="image" :src="image" />
      </div>
      <div class="video" v-if="video">
        <video controls :src="video">对不起，您的浏览器不支持内嵌视频。</video>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    margin: 5% 0 0 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    margin: 3rem 0 1rem 0;

    & textarea {
      width: 100%;
      height: 200px;
      border: 0.5rem solid #ffffff;
      border-radius: 0.3rem;
      resize: none;
      outline: none;
      animation: shadow-pulse 1s infinite;
    }

    & textarea:not(:placeholder-shown) {
      box-shadow: 0 0 0 2px rgb(77, 165, 247);
      animation: none;
    }

    & button {
      width: 100%;
      margin-top: 1rem;
    }
  }

  @media (max-width: 800px) {
    .main {
      width: 90%;
    }
  }

  .gallery {
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 0 2rem 0;

    .desc {
      width: 100%;
      text-align: left;
      margin-bottom: 1rem;
    }

    .images {
      column-count: 2;

      & img {
        margin-bottom: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
      }
    }

    .video {
      & video {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
      }
    }
  }

  @media (max-width: 800px) {
    .gallery {
      width: 90%;
    }
  }
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
</style>
