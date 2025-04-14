<template>
  <div class="action-bar">
    <Prev @click="prev" />
    <Pause
      v-if="isPlaying"
      @click="pause"
    />
    <Play
      v-else
      @click="play"
    />
    <Next @click="next" />
    <p class="current-time">{{ formatTime(currentTime) }}</p>
  </div>
</template>

<script setup>
import Prev from './icons/prev.vue';
import Next from './icons/next.vue';
import Play from './icons/play.vue';
import Pause from './icons/pause.vue';
import { useVideoStore } from '@/stores/video.js';
import { formatTime } from '@/utils/formatTime.js';
import { storeToRefs } from 'pinia';

const videoStore = useVideoStore();

const { isPlaying, currentTime } = storeToRefs(videoStore);

const emits = defineEmits(['prev', 'play', 'pause', 'next']);
const play = () => {
  emits('play');
};

const pause = () => {
  emits('pause');
};

const prev = () => {
  emits('prev');
};

const next = () => {
  emits('next');
};
</script>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin: 12px 0;
  svg {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: #d2d2d2;
    }
  }
  .current-time {
    margin: 0;
    width: 50px;
    text-align: right;
  }
}
</style>
