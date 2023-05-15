<template>
    <div>
        <table>
            <transition-group tag="tbody" name="row">
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td ref="editableCell" @dblclick="startEditing(rowIndex, $event)">
                        <span v-if="!isEditing(rowIndex)">{{ row }}</span>
                        <input v-else type="text" :value="row" @input="updateCellValue($event.target.value, rowIndex)"
                            @blur="setEditing(-1)" />
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
            <img src="../assets/icons/edit.png" @click="toggleEditingMode" />
        </div>
    </div>
</template>
  
<script>
import { nextTick } from "vue";
import ToggleButton from "./ToggleButton.vue";

export default {
    components: {
        ToggleButton
    },
    data() {
        return {
            rows: [
                "Sample 1",
                "Sample 2",
                "Sample 3"
            ],
            editing: {
                row: -1
            },
            editingMode: false
        };
    },
    methods: {
        handle(id, checked) {
            // console.log(id, checked);
        },
        setEditing(rowIndex) {
            this.editing.row = rowIndex;
        },
        startEditing(rowIndex, event) {
            this.setEditing(rowIndex);
            this.$nextTick(() => {
                const tdElement = this.$refs.editableCell[rowIndex];
                if (tdElement) {
                    const inputElement = tdElement.querySelector('input');
                    if (inputElement) {
                        inputElement.focus();
                    }
                }
            });
        },

        stopEditing(rowIndex) {
            this.editing.row = -1;
        },
        isEditing(rowIndex) {
            return this.editing.row === rowIndex;
        },
        updateCellValue(value, rowIndex) {
            this.rows[rowIndex] = value;
        },
        printRowData(rowIndex) {
            console.log(this.rows[rowIndex]);
        },
        addRow() {
            this.rows.push("");
            const newRowIdx = this.rows.length - 1;
            this.setEditing(newRowIdx);
            nextTick(() => {
                this.$el.querySelector("tr:last-child td:first-child input").focus();
            });
        },
        toggleEditingMode() {
            this.editingMode = !this.editingMode;
        },
        removeRow(rowIndex) {
            this.rows.splice(rowIndex, 1);
        }

    }
};
</script>
  
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
</style>
  