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
      ref="fileInputRef"
      accept="video/*"
      hidden
      :disabled="isLoading"
      @change="handleFileSelect"
    />
    <div class="btn-wrapper">
      <button
        class="file-input-btn"
        :disabled="isLoading"
      >
        Click To Select
      </button>
      <div
        v-if="isLoading"
        class="loading-wrapper"
      >
        <Loading class="loading" />
      </div>
      <p
        v-if="isError"
        class="error-text"
      >
        Error, Please try again
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVideoStore } from '@/stores/video.js';
import Loading from '@/components/icons/loading.vue';

const videoStore = useVideoStore();

const isLoading = ref(false);
const isError = ref(false);
const isDragOver = ref(false);
const fileInputRef = ref(null);

const emit = defineEmits(['success']);

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const triggerFileInput = () => {
  fileInputRef.value.click();
};

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    await uploadFile(file);
  }
  isDragOver.value = false;
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file);
  }
};

const uploadFile = async (file) => {
  try {
    if (isLoading.value) {
      return;
    }
    isError.value = false;
    isLoading.value = true;
    await videoStore.processVideo(file);
    emit('success');
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
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
    border-color: var(--primary-color);
  }

  .btn-wrapper {
    width: 180px;
    border-radius: var(--border-radius);
    position: relative;
    overflow: hidden;

    .loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      background: var(--primary-color);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    .loading {
      width: 30px;
      height: 30px;
      color: white;
      animation: spin 1.5s linear infinite;
    }

    .error-text {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transform: translateY(150%);
      transition: all 0.3s;
      color: var(--danger-color);
      text-align: center;
      margin: 0;
      @starting-style {
        transform: translateY(0);
        opacity: 0;
      }
    }
  }

  .file-input-btn {
    width: 100%;
    padding: 20px 0;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
