<template>
  <div class="preview-container">
    <div class="title-wrapper">
      <h2>Preview</h2>
      <router-link
        to="/"
        class="return-link"
        >Try Another Video</router-link
      >
    </div>

    <div class="video-wrapper">
      <video
        ref="videoRef"
        playsinline
        webkit-playsinline
        :src="url"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="onTimeUpdate"
      ></video>
      <div class="subtitle-wrapper">
        <div
          v-show="selectedSubtitle"
          class="selected-subtitle"
        >
          {{ selectedSubtitle }}
        </div>
      </div>
    </div>
    <ActionBar
      @play="play"
      @pause="pause"
      @prev="prev"
      @next="next"
    />
    <SeekBar @onClickSelectTime="onClickSelectTime" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRaw, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useVideoStore } from '@/stores/video.js';

import SeekBar from './SeekBar.vue';
import ActionBar from './ActionBar.vue';

const videoStore = useVideoStore();

const { videoRef, url, id, duration, currentTime, selectedTranscriptItems } =
  storeToRefs(videoStore);

const selectedSubtitle = ref('');
const transcript = ref([]);

const onPlay = () => {
  videoStore.setIsPlaying(true);
};

const onPause = () => {
  videoStore.setIsPlaying(false);
};

const onEnded = () => {
  videoStore.setIsPlaying(false);
};

const onLoadedMetadata = () => {
  videoStore.setDuration(videoRef.value.duration);
};

const onTimeUpdate = () => {
  videoStore.setCurrentTime(videoRef.value?.currentTime || 0);
  const selectedIndex = selectedTranscriptItems.value.findIndex(
    (item) => item.startTime <= currentTime.value && item.endTime >= currentTime.value,
  );
  selectedSubtitle.value = selectedTranscriptItems.value[selectedIndex]?.text || '';
};

const onClickSelectTime = (time) => {
  videoRef.value.currentTime = time;
};

const play = () => {
  videoRef.value.play();
};

const pause = () => {
  videoRef.value.pause();
};

const prev = () => {
  let lastSelectedTranscriptItem = {};
  selectedTranscriptItems.value.forEach((item) => {
    if (item.startTime < currentTime.value) {
      lastSelectedTranscriptItem = structuredClone(toRaw(item));
    }
  });
  if (lastSelectedTranscriptItem?.startTime != null) {
    videoRef.value.currentTime = lastSelectedTranscriptItem.startTime;
  }
};

const next = () => {
  const nextItem = selectedTranscriptItems.value.find((item) => item.startTime > currentTime.value);

  if (nextItem?.startTime) {
    videoRef.value.currentTime = nextItem.startTime;
  }
};
</script>

<style lang="scss" scoped>
.preview-container {
  padding: 12px 20px;
  background: #1f2937;
  flex: 1;
  overflow: auto;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  h2 {
    color: white;
    margin: 0;
  }
  .video-wrapper {
    position: relative;
    video {
      width: 100%;
    }
    .subtitle-wrapper {
      position: absolute;
      bottom: 10px;
      right: 10px;
      left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .selected-subtitle {
      background: rgba($color: #000000, $alpha: 0.5);
      color: white;
      font-size: 20px;
      padding: 4px;
      border-radius: var(--border-radius);
    }
  }
  .return-link {
    display: inline-block;
    color: white;
    text-align: right;
    margin-left: auto;
  }
}
</style>
