<script setup lang="ts">
import { ref } from 'vue'
interface Props {
    placeholder?: string
    buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: '请输入',
    buttonText: 'GO'
})

const emits = defineEmits(['submit'])

const inputValue = ref('')

const submitValue = () => {
    emits('submit', inputValue.value)
}
</script>

<template>
    <div class="single-input-container">
        <input class="single-input" type="text" :placeholder="props.placeholder" v-model="inputValue"/>
        <button class="input-button" @click="submitValue">{{ props.buttonText }}</button>
    </div>
</template>

<style scoped>

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