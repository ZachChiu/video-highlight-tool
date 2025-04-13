<template>
  <div class="high-light-container">
    <Transcript />
    <Preview />
  </div>
</template>

<script setup>
import Preview from '@/components/Preview.vue';
import Transcript from '@/components/Transcript.vue';
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
