<template>
  <div class="transcript-container">
    <h2>Transcript</h2>
    <div
      v-for="transcript in transcripts"
      :key="transcript.section"
    >
      <h3>{{ transcript.section }}</h3>
      <TranscriptItem
        v-for="item in transcript?.items || []"
        :item="item"
        :key="item.time"
        @onClickItem="onClickItem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TranscriptItem from './TranscriptItem.vue';

const transcripts = ref([
  {
    section: 'Introduction',
    items: [
      { time: '00:00', text: 'Welcome to our product demonstration.', isHighLight: true },
      { time: '00:05', text: 'Today, we’ll be showcasing our latest innovation.' },
    ],
  },
  {
    section: 'Key Features',
    items: [
      { time: '00:15', text: 'Our product has three main features.' },
      { time: '00:20', text: 'First, it’s incredibly easy to use.' },
      { time: '00:25', text: 'Second, it’s highly efficient.' },
      { time: '00:30', text: 'And third, it’s cost-effective.' },
    ],
  },
  {
    section: 'Demonstration',
    items: [
      { time: '00:40', text: 'Let me show you how it works.' },
      { time: '00:45', text: 'Simply press this button to start.' },
      { time: '00:50', text: 'The interface is intuitive and user-friendly.' },
    ],
  },
  {
    section: 'Conclusion',
    items: [
      { time: '01:00', text: 'In conclusion, our product is a game-changer.' },
      { time: '01:05', text: 'We’re excited to bring this to market.' },
      { time: '01:10', text: 'Thank you for your attention.' },
    ],
  },
]);

const onClickItem = (item) => {
  console.log(item);
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
