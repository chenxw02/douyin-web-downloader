<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    panelName: string
}

const props = defineProps<Props>()

const isExpanded = ref(true)

const togglePanel = () => {
    isExpanded.value = !isExpanded.value
}
</script>

<template>
    <div class="panel">
        <div class="panel-header" @click="togglePanel">
            <span>{{ props.panelName }}</span>
            <div class="triangle" :class="{ rotated: isExpanded }"></div>
        </div>
        <div class="panel-content" :class="{ expanded: isExpanded }">
            <div class="slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel {
    width: 100%;
    color: black;
    background-color: white;
    border-radius: 4px;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    cursor: pointer;
    border-radius: 4px;
}

.panel-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
}

.panel-content.expanded {
    max-height: 500px;
}

.slot {
    padding: 0 20px 10px 20px;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid rgba(56, 79, 194, 1);
    /* 三角形颜色 */
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}

.triangle.rotated {
    transform: rotate(180deg);
}
</style>