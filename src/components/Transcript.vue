<template>
  <div class="transcript-container">
    <h2>Transcript</h2>
    <div
      v-for="(transcript, index) in transcripts"
      :key="transcript.id"
    >
      <h3>{{ transcript.section }}</h3>
      <TranscriptItem
        v-for="(item, itemIndex) in transcript?.items || []"
        :item="item"
        :key="item.id"
        @onClickItem="onClickItem(index, itemIndex)"
        @onClickSelectTime="onClickSelectTime"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TranscriptItem from './TranscriptItem.vue';
import { useVideoStore } from '@/stores/video.js';
import { storeToRefs } from 'pinia';

const videoStore = useVideoStore();

const { videoRef, transcripts } = storeToRefs(videoStore);

const onClickItem = (index, itemIndex) => {
  videoStore.toggleSelectTranscript(index, itemIndex);
};

const onClickSelectTime = (item) => {
  videoRef.value.currentTime = item.startTime;
};
</script>

<style lang="scss" scoped>
.transcript-container {
  padding: 12px 20px;
  background: #f3f4f6;
  flex: 1;
  overflow: auto;
  h2 {
    margin: 0 0 12px;
  }
}
</style>
