<template>
  <div
    class="file-upload-container"
    :class="{ 'is-dragover': isDragOver }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input
      type="file"
      ref="fileInput"
      accept="video/*"
      hidden
      @change="handleFileSelect"
    />
    <button class="file-input-button">Click To Select</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDragOver = ref(false);
const fileName = ref(null);
const fileInput = ref(null);

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    fileName.value = file.name;
  }
  isDragOver.value = false;
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};
</script>

<style scoped lang="scss">
.file-upload-container {
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  border: 2px dashed #ccc;
  border-radius: var(--border-radius);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.is-dragover {
    border-color: #4caf50;
  }
}

.file-input-button {
  padding: 20px 40px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: var(--border-radius);
  &:hover {
    background-color: #0056b3;
  }
}
</style>
