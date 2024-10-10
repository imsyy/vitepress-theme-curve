<template>
  <div class="checkbox" @click="checkboxClick">
    <div :class="['checkbox-box', { check: model }]" />
    <div class="checkbox-label">
      <slot />
    </div>
  </div>
</template>

<script setup>
const model = defineModel();

// 点击切换
const checkboxClick = () => {
  model.value = !model.value;
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
  .checkbox-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 8px;
    border: 1.5px solid var(--main-card-border);
    transition:
      border 0.3s,
      background-color 0.3s;
    &::after {
      content: "\e04e";
      position: absolute;
      font-family: "iconfont";
      font-size: 12px;
      color: var(--main-card-background);
      font-weight: bold;
      opacity: 0;
      transform: scale(0);
      transition:
        opacity 0.3s,
        transform 0.3s;
    }
    &.check {
      background-color: var(--main-color);
      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  &:hover {
    .checkbox-box {
      border-color: var(--main-color);
    }
  }
}
</style>
