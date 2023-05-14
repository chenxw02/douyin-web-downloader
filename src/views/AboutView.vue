<script setup lang="ts">
import MessageCard from '@/components/MessageCard.vue';
import ExpandablePanel from '@/components/ExpandablePanel.vue';
import { ref } from 'vue'
const loading = ref(false)
const message = ref('')
const likedURL = ref('')
const postsURL = ref('')
const cookie = ref('')

const open = () => {
  message.value = 'Hello World!'
}
</script>

<template>
  <LoadAni :loading="loading" />
  <MessageCard :message="message" :visible="message !== ''" @close="message = ''" />
  <div class="content">
    <ExpandablePanel panel-name="高级下载">
      <div class="advanced-downlaod">
        <div class="liked-posts">
          <div class="single-input-container">
            <input class="single-input" type="text" v-model="likedURL" placeholder="输入框" />
            <button class="input-button" @click="open">GO</button>
          </div>
        </div>
        <div class="homepage-posts">
          <div class="connected-input-container">
            <input class="connected-input first-input" type="text" v-model="postsURL" placeholder="输入框1" />
            <input class="connected-input second-input" type="text" v-model="cookie" placeholder="输入框2" />
            <button class="connected-button" @click="open">GO</button>
          </div>
        </div>
      </div>
    </ExpandablePanel>
    <div class="control-pannel">
      <div>内容筛选</div>
      <div>自动下载</div>
    </div>
  </div>
</template>

<style scoped>
/* 公共样式 */
.content {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.advanced-downlaod,
.control-pannel {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.3rem;
}

.advanced-downlaod .button,
.control-pannel {
  margin: 10px 0;
}

.liked-posts,
.homepage-posts {
  width: 100%;
  margin: 10px 0;
}

.single-input-container {
  display: flex;
}

.single-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.input-button {
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-left: 5px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  height: 35px;
  width: max-content;
}

.connected-input-container {
  display: flex;
}

.connected-input {
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;
  outline: none;
  font-size: 14px;
}

.first-input {
  width: 70%;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.second-input {
  width: 30%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.connected-button {
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-left: 5px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  height: 35px;
  width: max-content;
}

@media screen and (max-width: 800px) {
  .content {
    width: 80%;
  }
}
</style>
