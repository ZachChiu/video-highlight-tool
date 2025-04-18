<template>
  <div
    ref="transcriptItemRef"
    class="transcript-item"
    :class="{ selected: item.isSelected, active: isInCurrentTime }"
    @click="onClickItem"
  >
    <p
      class="time"
      @click.stop="onClickSelectTime"
    >
      {{ formatTime(item.startTime) }}
    </p>
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script setup>
import { formatTime } from '@/utils/formatTime.js';
import { useVideoStore } from '@/stores/video.js';
import { storeToRefs } from 'pinia';
import { computed, onMounted, watch, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  outerRef: {
    type: Object,
    required: true,
  },
});

const transcriptItemRef = ref(null);
const videoStore = useVideoStore();
const { currentTime } = storeToRefs(videoStore);

const isInCurrentTime = computed(() => {
  return props.item.startTime <= currentTime.value && props.item.endTime >= currentTime.value;
});

watch(
  () => isInCurrentTime?.value,
  () => {
    if (isInCurrentTime?.value) {
      const containerRect = props.outerRef.getBoundingClientRect();
      const itemRect = transcriptItemRef.value.getBoundingClientRect();

      const inView =
        itemRect.top < containerRect.bottom &&
        itemRect.bottom > containerRect.top &&
        itemRect.left < containerRect.right &&
        itemRect.right > containerRect.left;

      if (!inView) {
        transcriptItemRef.value.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  },
);

const emits = defineEmits(['onClickItem', 'onClickSelectTime']);

const onClickItem = () => {
  emits('onClickItem');
};

const onClickSelectTime = () => {
  emits('onClickSelectTime', props.item);
};
</script>

<style lang="scss" scoped>
.transcript-item {
  display: flex;
  background: white;
  border-radius: var(--border-radius);
  padding: 12px;
  column-gap: 8px;
  border: 2px solid transparent;
  transition: all 0.3s;
  cursor: pointer;
  &.selected {
    background: var(--primary-color);
    .time,
    .text {
      color: white;
    }
  }
  &.active {
    border-color: #f9cc15;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  .time {
    color: var(--primary-color);
    font-weight: bold;
    margin: 0;
  }

  .text {
    margin: 0;
    width: 20em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
