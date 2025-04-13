<template>
  <div class="preview-container">
    <h2>Preview</h2>
    <video
      ref="videoRef"
      src="../assets/1.mp4"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
    ></video>
    <ActionBar
      :isPlaying="isPlaying"
      :currentTime="currentTime"
      @play="play"
      @pause="pause"
    />
    <SeekBar
      :currentTime="currentTime"
      :duration="duration"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import SeekBar from './SeekBar.vue';
import ActionBar from './ActionBar.vue';

const transcript = ref([]);

const videoRef = ref(null);
const videoSrc = 'your-video.mp4';

const isPlaying = ref(false);
const duration = ref(0); // 總時長
const currentTime = ref(0); // 目前進度

const onPlay = () => {
  isPlaying.value = true;
};

const onPause = () => {
  isPlaying.value = false;
};

const onEnded = () => {
  isPlaying.value = false;
};

const onLoadedMetadata = () => {
  duration.value = videoRef.value.duration;
  videoRef.value.controls = false;
  isPlaying.value = false;
};

const onTimeUpdate = () => {
  currentTime.value = videoRef.value.currentTime;
};

const play = () => {
  videoRef.value.play();
};

const pause = () => {
  videoRef.value.pause();
};

const prev = () => {
  console.log('prev');
};

const next = () => {
  console.log('prev');
};
</script>

<style lang="scss" scoped>
.preview-container {
  padding: 12px 20px;
  background: #1f2937;
  flex: 1;
  h2 {
    color: white;
    margin: 0 0 12px;
  }
  video {
    width: 100%;
  }
}
</style>
