<template>
  <div class="seek-bar">
    <div
      class="current-time-line"
      :style="`left: ${currentTimeLine}%`"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  currentTime: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const currentTimeLine = computed(() => {
  return (props.currentTime / props.duration) * 100;
});
</script>

<style lang="scss" scoped>
.seek-bar {
  position: relative;
  background: #374151;
  height: 30px;
  border-radius: var(--border-radius);
  .current-time-line {
    width: 1px;
    height: 100%;
    background: #ef4444;
    left: 0;
    position: absolute;
  }
}
</style>
