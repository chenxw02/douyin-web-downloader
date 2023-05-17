<script setup lang="ts">
import LoadAni from '@/components/LoadAni.vue';
import MessageCard from '@/components/MessageCard.vue';
import ExpandablePanel from '@/components/ExpandablePanel.vue';
import InputButton from '@/components/InputButton.vue';
import CompositeInputButton from '@/components/CompositeInputButton.vue';
import EditableTable from '@/components/EditableTable.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import { ref } from 'vue'
const loading = ref(false)
const message = ref('')
const likedURL = ref('')
const postsURL = ref('')
const cookie = ref('')

const open = () => {
  message.value = 'Hello World!'
}

const handle_likes_submit = (url: string) => {
  likedURL.value = url
  open()
}

const handle_posts_submit = (url: string[]) => {
  postsURL.value = url[0]
  cookie.value = url[1]
}

const myData = ref([
  'some data',
  'some data',
  'some data',
])
</script>

<template>
  <LoadAni :loading="loading" />
  <MessageCard :message="message" :visible="message !== ''" @close="message = ''" />
  <div class="content">
    <div class="advanced-downlaod">
      <ExpandablePanel panel-name="高级下载">
        <div class="liked-posts">
          <InputButton @submit="handle_likes_submit" />
        </div>
        <div class="homepage-posts">
          <CompositeInputButton @submit="handle_posts_submit" />
        </div>
      </ExpandablePanel>
    </div>

    <div class="control-pannel">
      <ExpandablePanel panel-name="控制面板">
        <div style="width: 200px;">内容筛选</div>
        <div>自动下载</div>
      </ExpandablePanel>
    </div>

    <div class="table">
      <ExpandablePanel panel-name="下载列表">
        <EditableTable v-model:model-value="myData" />
      </ExpandablePanel>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table {
  width: 100%;
  margin-top: 3vh;
  margin-bottom: 3vh;
}

.advanced-downlaod,
.control-pannel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.3rem;
}

.advanced-downlaod {
  margin-top: 8vh;
  margin-bottom: 3vh;
}

.liked-posts,
.homepage-posts {
  width: 100%;
  margin: 10px 0;
}

@media screen and (max-width: 800px) {
  .content {
    width: 80%;
  }
}
</style>
