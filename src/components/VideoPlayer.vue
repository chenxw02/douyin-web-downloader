<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
interface Props {
    url: string
}
defineProps<Props>()

const emits = defineEmits(['onVideoLoaded']);

const videoLoaded = () => {
    emits('onVideoLoaded');
};

const videoWidth = ref(window.innerWidth);
const videoHeight = ref((videoWidth.value * 9) / 16); // 以 16:9 的宽高比计算视频高度

const updateVideoSize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 800) {
        videoWidth.value = windowWidth * 0.45;
    } else {
        videoWidth.value = windowWidth * 0.8;
    }
    videoHeight.value = (videoWidth.value * 9) / 16;
};

const onResize = () => {
    updateVideoSize();
};

onMounted(() => {
    window.addEventListener('resize', onResize);
    updateVideoSize();
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});

</script>

<template>
    <div class="video-player">
        <video controls :src="url" :width="videoWidth" :height="videoHeight" @loadedmetadata="videoLoaded">
            对不起，您的浏览器不支持内嵌视频。
        </video>
    </div>
</template>