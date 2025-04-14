<template>
  <div
    ref="seekBarRef"
    class="seek-bar"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="onClickSelectTime"
  >
    <div
      class="current-time-line"
      :style="`left: ${currentTimeLine}%`"
    ></div>
    <div
      v-if="hoverX"
      class="hover-time-line"
      :style="{ left: hoverX + 'px' }"
    ></div>
    <div
      v-for="selectedTranscriptItem in selectedTranscriptItems"
      class="high-light"
      :style="getHighLightStyle(selectedTranscriptItem)"
      :key="selectedTranscriptItem.id"
    ></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useVideoStore } from '@/stores/video.js';
import { storeToRefs } from 'pinia';

const videoStore = useVideoStore();
const seekBarRef = ref(null);
const hoverX = ref(null);

const { currentTime, duration, transcripts, selectedTranscriptItems } = storeToRefs(videoStore);
const currentTimeLine = computed(() => {
  return (currentTime.value / duration.value) * 100;
});

const getHighLightStyle = (selectedTranscriptItem) => ({
  left: `${(selectedTranscriptItem.startTime / duration.value) * 100}%`,
  width: `${((selectedTranscriptItem.endTime - selectedTranscriptItem.startTime) / duration.value) * 100}%`,
});

const handleMouseMove = (event) => {
  const rect = seekBarRef.value.getBoundingClientRect();
  hoverX.value = event.clientX - rect.left;
};

const handleMouseLeave = () => {
  hoverX.value = null;
};

const emits = defineEmits(['onClickSelectTime']);

function onClickSelectTime(event) {
  const rect = seekBarRef.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = clickX / rect.width;
  const time = duration.value * ratio;

  emits('onClickSelectTime', time);
}
</script>

<style lang="scss" scoped>
.seek-bar {
  position: relative;
  background: #374151;
  height: 30px;
  border-radius: var(--border-radius);
  overflow: hidden;
  .current-time-line {
    width: 1px;
    height: 100%;
    background: var(--danger-color);
    left: 0;
    position: absolute;
    z-index: 10;
  }
  .hover-time-line {
    width: 1px;
    height: 100%;
    background: var(--primary-color);
    left: 0;
    position: absolute;
    z-index: 10;
  }
  .high-light {
    background: var(--primary-color);
    position: absolute;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
