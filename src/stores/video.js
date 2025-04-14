import { uploadVideo, getTranscript } from '@/Apis/video';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useVideoStore = defineStore('video', {
  state: () => ({
    url: '',
    id: null,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    videoRef: null,
    transcripts: [],
  }),
  getters: {
    selectedTranscriptItems: (state) => {
      return state.transcripts
        .map((transcript) => transcript.items)
        .flat()
        .filter((item) => item.isSelected);
    },
  },
  actions: {
    async processVideo(fileData) {
      const videoRes = await uploadVideo(fileData);
      const transcriptsRes = await getTranscript(videoRes.id);

      const { url, id, duration } = videoRes.data;
      this.$patch({
        id,
        url,
        duration,
        currentTime: 0,
        transcripts: transcriptsRes.data,
      });
    },
    toggleSelectTranscript(index, itemIndex) {
      this.transcripts[index].items[itemIndex].isSelected =
        !this.transcripts[index].items[itemIndex]?.isSelected;
    },
    setCurrentTime(currentTime) {
      this.currentTime = currentTime;
    },
    setDuration(duration) {
      this.duration = duration;
    },
    setIsPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVideoStore, import.meta.hot));
}
