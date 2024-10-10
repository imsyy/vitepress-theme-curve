<!-- 全局消息 -->
<template>
  <Teleport to="body">
    <Transition name="fadeDown" mode="out-in">
      <div
        v-if="messageShow"
        :class="['message', messageType, { always: messageAlways }]"
        :style="{ '--duration': messageDuration + 'ms' }"
        @click="closeMessage"
      >
        <div class="message-content">
          <span class="text">{{ messageContent || "默认消息内容" }}</span>
          <span v-if="messageClose" class="close">
            <i class="iconfont icon-close"></i>
          </span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// 消息数据
const messageType = ref("info");
const messageShow = ref(false);
const messageClose = ref(false);
const messageContent = ref(null);
const messageAlways = ref(false);
const messageDuration = ref(0);
const messageTimeOut = ref(null);

// 消息处理
const showMessage = (text, type = "info", options = {}, func = null) => {
  // 解构配置
  const { close = false, always = false, duration = 3000 } = options;
  // 先隐藏
  messageShow.value = false;
  clearTimeout(messageTimeOut.value);
  // 显示弹窗
  nextTick().then(() => {
    // 更改默认配置
    messageClose.value = close;
    messageContent.value = text;
    messageType.value = type;
    messageShow.value = true;
    messageAlways.value = always;
    messageDuration.value = duration;
    // 自动关闭消息
    if (!always) {
      messageTimeOut.value = setTimeout(() => {
        messageShow.value = false;
        // 执行函数
        if (typeof func === "function") func();
      }, duration);
    }
  });
};

// 弹出消息
const message = {
  // 信息
  info: (text, options, func) => {
    showMessage(text, "info", options, func);
  },
  // 成功
  success: (text, options, func) => {
    showMessage(text, "success", options, func);
  },
  // 警告
  warning: (text, options, func) => {
    showMessage(text, "warning", options, func);
  },
  // 错误
  error: (text, options, func) => {
    showMessage(text, "error", options, func);
  },
};

// 关闭消息
const closeMessage = () => {
  messageShow.value = false;
  clearTimeout(messageTimeOut.value);
};

onMounted(() => {
  // 挂载全局
  window.$message = message;
});
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  width: 100vw;
  background-color: var(--main-color);
  z-index: 3000;
  .message-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    .text {
      color: var(--main-card-background);
    }
    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 12px;
      padding: 10px;
      border-radius: 50%;
      transition: background-color 0.3s;
      cursor: pointer;
      .iconfont {
        font-size: 14px;
        color: var(--main-card-background);
        opacity: 0.6;
        transition: opacity 0.3s;
      }
      &:hover {
        background-color: var(--main-color-white);
        .iconfont {
          opacity: 1;
        }
      }
    }
  }
  &.success {
    background-color: var(--main-success-color);
  }
  &.warning {
    background-color: var(--main-warning-color);
  }
  &.error {
    background-color: var(--main-error-color);
  }
  &.info {
    background-color: var(--main-info-color);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    z-index: -1;
    background-color: var(--main-color-white);
    transition: width 0.3s;
    animation: loading-width var(--duration) linear forwards;
  }
  &.always {
    &::after {
      width: 100%;
      animation: loading 1.5s infinite;
    }
  }
}
</style>
