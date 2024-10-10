<!-- 中控台 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in" @before-enter="changeCloseStyle">
      <div v-if="store.controlShow" class="control" @click="store.changeShowStatus('controlShow')">
        <!-- 关闭按钮 -->
        <div ref="closeControlRef" class="close-control">
          <i class="iconfont icon-close"></i>
        </div>
        <!-- 背景遮罩 -->
        <div class="control-mask" />
        <!-- 中控台内容 -->
        <div class="control-content" @click.stop>
          <!-- 功能菜单 -->
          <div class="menu">
            <div class="menu-item open" title="显示模式切换" @click.stop="store.changeThemeType">
              <i :class="`iconfont icon-${store.themeType}`"></i>
            </div>
            <div
              :class="['menu-item', { open: store.useRightMenu }]"
              title="右键菜单开关"
              @click.stop="rightMenuSwitch"
            >
              <i class="iconfont icon-list"></i>
            </div>
            <div
              :class="['menu-item', { open: store.playerShow }]"
              title="播放器开关"
              @click.stop="store.playerShow = !store.playerShow"
            >
              <i class="iconfont icon-music"></i>
            </div>
            <div
              :class="['menu-item', { open: store.backgroundBlur }]"
              title="背景模糊开关"
              @click.stop="store.changeShowStatus('backgroundBlur')"
            >
              <i class="iconfont icon-blur"></i>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();

const closeControlRef = ref(null);

// 更正关闭按钮位置
const changeCloseStyle = () => {
  nextTick().then(() => {
    const controlOpenDom = document.querySelector("#open-control");
    if (controlOpenDom && closeControlRef.value) {
      const { top, left } = controlOpenDom.getBoundingClientRect();
      closeControlRef.value.style.top = `${top}px`;
      closeControlRef.value.style.left = `${left}px`;
      closeControlRef.value.style.opacity = "1";
    }
  });
};

// 右键菜单开关
const rightMenuSwitch = () => {
  store.useRightMenu = !store.useRightMenu;
  $message.info(`${store.useRightMenu ? "已开启" : "已关闭"}自定义右键菜单`);
};
</script>

<style lang="scss" scoped>
.control {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1109;
  .close-control {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    opacity: 0;
    transition:
      background-color 0.3s,
      opacity 0.3s;
    border-radius: 50%;
    cursor: pointer;
    .iconfont {
      font-size: 18px;
      line-height: 1;
      transition:
        color 0.3s,
        opacity 0.3s;
    }
    &:hover {
      background-color: var(--main-color);
      .iconfont {
        color: var(--main-card-background);
      }
    }
  }
  .control-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .control-content {
    position: absolute;
    animation: fade-up 0.5s forwards;
    .menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 6px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid var(--main-card-border);
        background-color: var(--main-card-background);
        transition:
          transform 0.3s,
          background-color 0.3s;
        cursor: pointer;
        .iconfont {
          font-size: 24px;
          color: var(--main-font-color);
          transition: color 0.3s;
        }
        &.open {
          background-color: var(--main-color);
          .iconfont {
            color: #fff;
          }
        }
        &:hover {
          transform: scale(1.05);
        }
        &:active {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
