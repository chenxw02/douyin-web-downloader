<script setup lang="ts">
import { nextTick, ref, withDefaults } from "vue";
import ToggleButton from "./ToggleButton.vue";

interface Props {
    modelValue: string[],
}

const props = defineProps<Props>()

const emits = defineEmits(["update:modelValue"]);

const editing = ref({
    row: -1
});

const editableCell = ref<HTMLElement[] | null>(null)

const editingMode = ref(false);

const unsavedChanges = ref(false);

const handle = (id: any, checked: any) => {
    console.log(id, checked);
};

const setEditing = (rowIndex: number) => {
    editing.value.row = rowIndex;
};

const startEditing = (rowIndex: number) => {
    if (!editingMode.value) {
        setEditing(rowIndex);
        unsavedChanges.value = true; 
        nextTick(() => {
            const tdElement = editableCell.value;
            if (tdElement) {
                const inputElement = tdElement[rowIndex].querySelector('input');
                if (inputElement) {
                    inputElement.focus();
                }
            }
        });
    }
}

const stopEditing = () => {
    console.log('stopEditing');
    editing.value.row = -1;
    unsavedChanges.value = false; 
};

const isEditing = (rowIndex: number) => {
    return editing.value.row === rowIndex;
};

const updateCellValue = (value: string, rowIndex: number) => {
    const updatedRows = [...props.modelValue];
    updatedRows[rowIndex] = value;
    emits('update:modelValue', updatedRows);
};

const addRow = () => {
    const updatedRows = [...props.modelValue, ""];
    const newRowIdx = updatedRows.length - 1;
    setEditing(newRowIdx);
    nextTick(() => {
        const lastRow = document.querySelector("tr:last-child td:first-child input");
        if (lastRow) {
            (lastRow as HTMLInputElement).focus();
        }
    });
    emits('update:modelValue', updatedRows);
};

const toggleEditingMode = (event: any) => {
    if (!unsavedChanges.value) {
        editingMode.value = !editingMode.value;
    } else {
        event.preventDefault();
    }
};

const handleClickOutside = (event: any) => {

    // 获取进入编辑模式的按钮
    const editButton = document.querySelector(".footer img:last-child");
    if (editButton && event.target === editButton) {
        event.preventDefault();
        return;
    }

    if (event.target.closest('td') !== editableCell.value) {
        stopEditing();
    }
};

window.addEventListener('click', handleClickOutside);


const removeRow = (rowIndex: number) => {
    const updatedRows = [...props.modelValue];
    updatedRows.splice(rowIndex, 1);
    emits('update:modelValue', updatedRows);
};
</script>

<template>
    <div>
        <table>
            <transition-group tag="tbody" name="row">
                <tr v-for="(row, rowIndex) in props.modelValue" :key="rowIndex">
                    <td ref="editableCell" @dblclick="startEditing(rowIndex)">
                        <span v-if="!isEditing(rowIndex)" :class="{ 'not-allowed': editingMode }">{{ row }}</span>
                        <input v-else type="text" :value="row" @input="updateCellValue($event.target.value, rowIndex)"
                             @keyup.enter="stopEditing()" />
                    </td>
                    <td class="right-aligned">
                        <img v-if="editingMode" src="../assets/icons/delete.png" @click="removeRow(rowIndex)" />
                        <div v-else class="flex-container">
                            <ToggleButton :id="rowIndex" @emitValue="handle" />
                        </div>
                        <!-- <button v-else>go</button> -->
                    </td>
                </tr>
            </transition-group>
        </table>
        <div class="footer">
            <img src="../assets/icons/add.png" @click="addRow">
            <img src="../assets/icons/edit.png" :class="{ 'not-allowed': unsavedChanges }" @click="toggleEditingMode($event)" />
        </div>
    </div>
</template>
  
<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    font-family: 'Courier New', Courier, monospace;
}

td {
    width: 50%;
    height: 50px;
    text-align: left;
}

img {
    height: 15px;
    cursor: pointer;
}

span {
    cursor: pointer;
}

.right-aligned {
    text-align: right;
}

.flex-container {
    display: flex;
    width: 100%;
    justify-content: right;
}

input[type="text"] {
    border: none;
    color: white;
    font-size: inherit;
    font-family: inherit;
    box-sizing: border-box;
    padding: 5px;
}

input[type="text"]:focus {
    outline: none;
    background-color: rgba(61, 79, 169, 1);
    width: 80%;
    border-radius: 4px;
}

button {
    background-color: rgb(61, 79, 169);
    border: none;
    border-radius: 50%;
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

.footer {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 40px;
    border-top: 1px solid #ccc;
}

.footer img {
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.not-allowed {
    cursor: not-allowed;
}
</style>
  