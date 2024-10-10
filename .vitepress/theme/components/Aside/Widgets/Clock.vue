<template>
  <div class="clock">
    <div class="clock-content">
      <div :style="{ transform: ` rotate(${hourRotate}deg)` }" class="pointer hour" />
      <div :style="{ transform: ` rotate(${minuteRotate}deg)` }" class="pointer minute" />
      <div :style="{ transform: ` rotate(${secondRotate}deg)` }" class="pointer second" />
    </div>
  </div>
</template>

<script setup>
// 指针数据
const hourRotate = ref(315);
const minuteRotate = ref(45);
const secondRotate = ref(180);
const pointerInterval = ref(null);

// 计算指针旋转角度
const updatePointer = () => {
  // 计算角度
  const calculateRotation = (time, total) => {
    return (time / total) * 360;
  };
  // 更改样式
  const changeStyle = () => {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    hourRotate.value = calculateRotation(hour, 12);
    minuteRotate.value = calculateRotation(minute, 60);
    secondRotate.value = calculateRotation(second, 60);
  };
  // 每秒更新
  changeStyle();
  pointerInterval.value = setInterval(changeStyle, 1000);
};

onMounted(() => {
  updatePointer();
});

onBeforeUnmount(() => {
  clearInterval(pointerInterval.value);
});
</script>

<style lang="scss" scoped>
.clock {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 6px solid var(--main-card-background);
  box-shadow: 0 8px 16px -4px var(--main-border-shadow);
  background-image: linear-gradient(to bottom, #505152, #2e2f30);
  overflow: hidden;
  .clock-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 16px -6px #191a1b;
    .pointer {
      position: absolute;
      bottom: calc(50% - 5px);
      box-shadow: 0 0 10px 0 #191a1b;
      border-radius: 25px;
      //   transition: transform 0.3s;
      &.hour {
        width: 10px;
        height: 40px;
        background-color: #e4e4e4;
        z-index: 2;
        transform-origin: 5px 35px;
      }
      &.minute {
        width: 8px;
        height: 55px;
        background-color: #d2d2d2;
        transform-origin: 4px 50px;
        z-index: 1;
      }
      &.second {
        width: 4px;
        height: 60px;
        background-color: #a51b1d;
        transform-origin: 2px 55px;
        z-index: 3;
        &::after {
          content: "";
          position: absolute;
          bottom: -6px;
          width: 4px;
          height: 10px;
          background-color: #a51b1d;
          border-radius: 25px;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #a51b1d;
      border-radius: 50%;
      z-index: 4;
    }
  }
}
</style>
