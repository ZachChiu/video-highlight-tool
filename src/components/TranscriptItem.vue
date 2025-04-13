<template>
  <div
    class="transcipt-item"
    :class="{ 'high-light': item.isHighLight }"
    @click="onClickItem"
  >
    <p class="time">{{ item.time }}</p>
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['onClickItem']);
const onClickItem = () => {
  emits('onClickItem', props.item);
};
</script>

<style lang="scss" scoped>
.transcipt-item {
  display: flex;
  background: white;
  border-radius: var(--border-radius);
  padding: 12px;
  column-gap: 8px;
  cursor: pointer;
  &.high-light {
    background: var(--primary-color);
    .time,
    .text {
      color: white;
    }
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
