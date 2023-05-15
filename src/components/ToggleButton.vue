<script setup lang="ts">
import { ref } from 'vue'
interface Props {
    id: string | number
}
const props = defineProps<Props>()
const emits = defineEmits(['emitValue'])

const checked = ref(true)
const toggle = () => {
    checked.value = !checked.value
    emits('emitValue', [props.id, checked.value])
}
</script>

<template>
    <div>
        <input type="checkbox" v-model="checked" class="toggle-checkbox" hidden />
        <label class="toggle-label" @click="toggle">
            <span class="toggle-inner" :class="{ active: checked }"></span>
        </label>
    </div>
</template>
    
<style scoped>
.toggle-label {
    display: inline-block;
    width: 50px;
    height: 25px;
    background-color: #ccc;
    border-radius: 25px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.toggle-inner {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1.5px;
    left: 2px;
    transition: transform 0.3s ease;
}

.toggle-inner.active {
    transform: translateX(25px);
}

.toggle-label:hover {
    background-color: #bbb;
}

.toggle-checkbox:checked+.toggle-label {
    background-color: rgb(61, 79, 169);
}
</style>
  