<template>
  <!-- 倒计时 -->
  <div class="count-down s-card">
    <div class="count-left">
      <span class="text"> 距离 </span>
      <span class="name">{{ theme.aside.countDown.data.name }}</span>
      <span class="time"> {{ getDaysUntil(theme.aside.countDown.data.date) }} </span>
      <span class="date">{{ theme.aside.countDown.data.date }}</span>
    </div>
    <div v-if="remainData" class="count-right">
      <div v-for="(item, tag, index) in remainData" :key="index" class="count-item">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-progress">
          <div
            class="progress-bar"
            :style="{ width: item.percentage + '%', opacity: item.percentage / 100 }"
          />
          <span :class="['percentage', { many: item.percentage >= 46 }]">
            {{ item.percentage }}%
          </span>
          <span :class="['remaining', { many: item.percentage >= 60 }]">
            <span class="tip">还剩</span>
            {{ item.remaining }}
            <span class="tip">{{ tag === "day" ? "小时" : "天" }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTimeRemaining, getDaysUntil } from "@/utils/timeTools";

const { theme } = useData();

// 倒计时数据
const remainData = ref(null);
const remainInterval = ref(null);

// 获取倒计时数据
const getRemainData = () => {
  remainData.value = getTimeRemaining();
  remainInterval.value = setInterval(() => {
    remainData.value = getTimeRemaining();
  }, 1000);
};

onMounted(() => {
  getRemainData();
});

onBeforeUnmount(() => {
  clearInterval(remainInterval.value);
});
</script>

<style lang="scss" scoped>
.count-down {
  display: flex;
  flex-direction: row;
  align-items: center;
  .count-left {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 0.8rem;
    .text {
      font-size: 14px;
      color: var(--main-font-second-color);
    }
    .name {
      font-weight: bold;
      font-size: 18px;
      margin-top: 2px;
    }
    .time {
      font-size: 30px;
      font-weight: bold;
      margin: 4px 0;
      color: var(--main-color);
    }
    .date {
      font-size: 12px;
      opacity: 0.6;
    }
    &::after {
      content: "";
      position: absolute;
      right: -0.8rem;
      width: 2px;
      height: 80%;
      background-color: var(--main-card-border);
    }
  }
  .count-right {
    flex: 1;
    width: 100%;
    margin-left: 0.8rem;
    .count-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 24px;
      margin: 6px 0;
      .item-name {
        font-size: 14px;
        margin-right: 0.8rem;
        white-space: nowrap;
        color: var(--main-font-second-color);
      }
      .item-progress {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        background-color: var(--main-color-bg);
        overflow: hidden;
        .progress-bar {
          height: 100%;
          border-radius: 8px;
          background-color: var(--main-color);
        }
        .percentage,
        .remaining {
          position: absolute;
          font-size: 12px;
          margin: 0 6px;
          transition:
            opacity 0.3s,
            transform 0.3s;
          &.many {
            color: #fff;
            .tip {
              opacity: 0.8;
            }
          }
        }
        .remaining {
          opacity: 0;
          transform: translateX(10px);
          .tip {
            opacity: 0.6;
          }
        }
      }
    }
  }
  &:hover {
    .count-right {
      .remaining {
        transform: translateX(0) !important;
        opacity: 1 !important;
      }
      .percentage {
        transform: translateX(-10px) !important;
        opacity: 0 !important;
      }
    }
  }
}
</style>
