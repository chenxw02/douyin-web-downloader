<script setup lang="ts">
import { ref } from 'vue';
import JSConfetti from 'js-confetti';
import { getData, singleRequest, download } from '@/service/data';
import { checkURL } from '@/utils/validate';
import NProgress from 'nprogress';

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
  // showGallery.value = false;
  // NProgress.configure({ showSpinner: false });
  // NProgress.start();
  // images.value = [];
  // video.value = '';
  // try {
  //   const params = {
  //     link: inputURL.value,
  //   };
  //   const data = await getData(params);
  //   desc.value = data['desc'];
  //   if (data['type'] === 'images' && data['urls']) {
  //     for (let i = 0; i < data['urls'].length; i++) {
  //       images.value.push(data['urls'][i]);
  //     }
  //   } else if (data['type'] === 'video' && data['urls']) {
  //     video.value = data['urls'][0];
  //   }
  // } catch (error) {
  //   // console.log(error);
  // }

  const params = {
    link: inputURL.value,
  };

  const data = await download(params);
  const imageBase64 = data.data;

  // 创建一个 Blob 对象，并指定 MIME 类型为 image/jpeg
  const blob = new Blob(
    [
      new Uint8Array(
        atob(imageBase64)
          .split('')
          .map((char) => char.charCodeAt(0))
      ),
    ],
    { type: 'image/jpeg' }
  );

  // 创建一个临时的下载链接
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = data.filename; // 下载的文件名
  link.style.display = 'none';

  // 将链接添加到页面并模拟点击
  document.body.appendChild(link);
  link.click();

  // 移除链接
  document.body.removeChild(link);
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

const onLoad = (event: any) => {
  const target = event.target;

  if (target.classList.contains('image-button')) {
    imageCount++;
    if (imageCount !== images.value.length) return;
  }

  jsConfetti.addConfetti();
  NProgress.done();
  showGallery.value = true;
};
</script>

<template>
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
    <div class="gallery" v-show="showGallery">
      <div class="desc">{{ desc }}</div>
      <div class="images" v-if="images.length">
        <img
          v-for="image in images"
          :key="image"
          :src="image"
          @load="onLoad($event)"
        />
      </div>
      <div class="video" v-if="video">
        <video controls :src="video" @loadeddata="onLoad($event)">
          对不起，您的浏览器不支持内嵌视频。
        </video>
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
