<!-- 弹窗组件 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <div class="modal-mask" @click.stop="maskClick" />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
          }"
          class="modal-main s-card"
          @click.stop
        >
          <!-- 标题 -->
          <div v-if="title" class="title">
            <div class="title-left">
              <i v-if="titleIcon" :class="`iconfont icon-${titleIcon}`"></i>
              <span class="title-text">{{ title }}</span>
            </div>
            <!-- 关闭按钮 -->
            <i v-if="showClose" class="iconfont icon-close close" @click="modalClose" />
          </div>
          <!-- 弹窗内容 -->
          <div class="modal-content" :style="{ '--height': maxHeight + 'vh' }">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: false,
  },
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 标题图标
  titleIcon: {
    type: String,
    default: "",
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true,
  },
  // 最大宽度
  maxWidth: {
    type: [Number, String],
    default: 800,
  },
  // 最大高度
  maxHeight: {
    type: Number,
    default: 80,
  },
});

// 发射事件
const emit = defineEmits(["mask-click", "modal-close"]);

// 遮罩层事件
const maskClick = () => emit("mask-click");
const modalClose = () => emit("modal-close");

// 监听开启
watch(
  () => props.show,
  (val) => {
    document.body.style.overflowY = val ? "hidden" : "";
  },
);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .modal-main {
    position: absolute;
    padding: 0;
    animation: fade-up 0.5s forwards;
    width: calc(100% - 40px);
    overflow: hidden;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      padding: 20px;
      height: 64px;
      background-color: var(--main-card-background);
      border-bottom: 1px solid var(--main-card-border);
      .title-left {
        width: 100%;
        .iconfont {
          font-size: 1.25rem;
          margin-right: 8px;
        }
      }
      .close {
        position: absolute;
        right: 20px;
        margin-right: 0;
        font-size: 1rem;
        border-radius: 8px;
        padding: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: var(--main-card-border);
        }
      }
    }
    .modal-content {
      max-height: calc(var(--height) - 46px);
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
