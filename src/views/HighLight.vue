<template>
  <div
    class="high-light-container"
  >
    <Transcript />
    <Preview />
  </div>
</template>

<script setup>
import Preview from '@/components/Preview.vue';
import Transcript from '@/components/Transcript.vue';
import { useVideoStore } from '@/stores/video.js';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const videoStore = useVideoStore();
const router = useRouter();

const { id } = storeToRefs(videoStore);

onMounted(() => {
  if (!id?.value) {
    router.push({ name: 'home' });
  }
});
</script>

<style lang="scss" scoped>
.high-light-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
}
</style>
