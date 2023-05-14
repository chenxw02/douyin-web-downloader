<script setup lang="ts">
import { ref } from 'vue'
interface Props {
    // placeholder为一个字符串构成的数组
    placeholder?: string[]
    buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: ()=> ['请输入', '请输入'],
    buttonText: 'GO'
})

const emits = defineEmits(['update', 'submit'])

const inputValue1 = ref('')
const inputValue2 = ref('')

const submitValue = () => {
    emits('submit', [inputValue1.value, inputValue2.value])
}
</script>

<template>
    <div class="connected-input-container">
        <input class="connected-input first-input" type="text" v-model="inputValue1" :placeholder="props.placeholder[0]" />
        <input class="connected-input second-input" type="text" v-model="inputValue2" :placeholder="props.placeholder[1]" />
        <button class="connected-button" @click="submitValue">{{ props.buttonText }}</button>
    </div>
</template>

<style scoped>
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
  background-color: rgb(61, 79, 169);
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
</style>