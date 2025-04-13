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

const props = defineProps({
  isPlaying: {
    type: Boolean,
    required: true,
  },
  currentTime: {
    type: Number,
    required: true,
  },
});

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

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
