<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElSwitch, ElInput, ElButton, ElSelect, ElOption } from 'element-plus';
import { linkToAliDrive } from '@/service/alidrive';
import { checkEmail } from '@/utils/validate';

const downloadOnly = ref(false);
const email = ref('');
const mode = ref('');

const options = [
  {
    value: 'default',
    label: '默认',
  },
  {
    value: 'download',
    label: '仅下载',
  },
  {
    value: 'withAliDrive',
    label: '同步到阿里云盘',
  },
];
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

  await linkToAliDrive({ email: email.value });
};
</script>

<template>
  <div class="advanced">
    <div class="content">
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
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

  .content {
    width: 500px;
    height: fit-content;
    padding: 20px;
    margin-top: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .bind {
      margin-bottom: 20px;
      .input {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 10px;
      }
    }

    .mode {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 800px) {
    .content {
      width: 90%;
    }
  }
}
</style>
