<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElDialog, ElInput, ElButton, ElSelect, ElOption } from 'element-plus';
import { getData, download, downloadToAliDrive } from '@/service/data';
import { checkURL, checkEmail, downloadFromBase64 } from '@/utils/validate';
import type { DouyinData } from '@/utils/interface';
import { linkToAliDrive } from '@/service/alidrive';
import { modes } from '@/utils/const';

const url = ref('');
const images = ref<string[]>([]);
const desc = ref('');
const video = ref('');
let imageCount = 0;
const showGallery = ref(false);
const showAdvanced = ref(false);

const email = ref('');
const mode = ref('');


mode.value = localStorage.getItem('mode') || 'default';
email.value = localStorage.getItem('email') || '';

watch(
  () => mode.value,
  (value) => {
    localStorage.setItem('mode', value);
  },
  { immediate: true }
);

watch(
  () => email.value,
  (value) => {
    localStorage.setItem('email', value);
  },
  { immediate: true }
);



const link = async () => {
  if (!checkEmail(email.value)) return;
  const res = await linkToAliDrive({ email: email.value });
  showAdvanced.value = false;
};

const parse = async () => {
  if (!checkURL(url.value)) return;

  beforeLoad();

  const params = {
    link: url.value,
  };

  if (localStorage.getItem('mode') === 'default') {
    const data = await getData(params);
    handleData(data);
    showGallery.value = true;
  } else if (localStorage.getItem('mode') === 'withAliDrive') {
    const data = await getData(params);
    handleData(data);
    showGallery.value = true;
    await downloadToAliDrive({
      ...params,
      email: localStorage.getItem('email') || '',
    });
  } else {
    const data = await download(params);
    downloadFromBase64(data.data, data.filename);
  }
};

const handleData = (data: DouyinData) => {
  desc.value = data.desc;
  switch (data.type) {
    case 'images':
      for (let i = 0; i < data.urls.length; i++) {
        images.value.push(data.urls[i]);
      }
      break;
    case 'video':
      video.value = data.urls[0];
      break;
    default:
      break;
  }
};

const beforeLoad = () => {
  images.value = [];
  desc.value = '';
  showGallery.value = false;
};
</script>

<template>
  <div class="header">
    <div class="icon">
      <img src="@/assets/icons/settings.png" alt="settings" @click="showAdvanced = true" />
    </div>
  </div>
  <div class="home">
    <div class="title">Douyin Downloader</div>
    <div class="main">
      <textarea v-model="url" placeholder="Paste your URL here" rows="10" cols="50"></textarea>
      <button @click="parse">GO</button>
    </div>
    <div class="gallery" v-show="showGallery">
      <div class="desc">{{ desc }}</div>
      <div class="images" v-if="images.length">
        <img v-for="image in images" :key="image" :src="image" />
      </div>
      <div class="video" v-if="video">
        <video controls :src="video">
          对不起，您的浏览器不支持内嵌视频。
        </video>
      </div>
    </div>
  </div>
  <el-dialog v-model="showAdvanced" align-center :show-close="false">
    <div class="advanced">
      <div class="bind">
        <p>绑定阿里云</p>
        <div class="input">
          <el-input v-model="email" placeholder="请输入邮箱接收二维码" />
          <el-button type="primary" @click="link">发送</el-button>
        </div>
      </div>
      <div class="mode">
        <p>下载模式</p>
        <el-select v-model="mode" class="m-2" placeholder="Select">
          <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;

  .icon {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 1rem;

    & img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}

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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;

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

.advanced {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & p {
    margin-bottom: 5px;
    color: gray;
    font-size: 10px;
  }

  .bind {
    width: 100%;
    margin-bottom: 20px;

    .input {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 10px;
    }
  }

  .mode {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
