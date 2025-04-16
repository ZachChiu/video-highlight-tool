<template>
  <div class="">
    <Upload @success="uploadSuccess" />
  </div>
</template>

<script setup>
import Upload from '@/components/Upload.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const uploadSuccess = () => {
  router.push({ name: 'high-light' });
};
</script>
