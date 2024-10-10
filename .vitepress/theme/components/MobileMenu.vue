<template>
  <Teleport to="body">
    <!-- 移动端菜单 -->
    <Transition name="fade" mode="out-in">
      <div v-show="store.mobileMenuShow" class="mobile-menu">
        <!-- 背景遮罩 -->
        <div class="menu-mask" @click="store.changeShowStatus('mobileMenuShow')" />
        <Transition name="toLeft" mode="out-in">
          <div v-show="store.mobileMenuShow" class="menu-content s-card">
            <!-- 关闭按钮 -->
            <div class="close-control" @click="store.changeShowStatus('mobileMenuShow')">
              <i class="iconfont icon-close"></i>
            </div>
            <!-- 菜单 -->
            <div class="menu-list">
              <div v-for="(item, index) in nav" :key="index" class="menu-item">
                <span class="link-title"> {{ item.text }}</span>
                <div v-if="item.items" class="link-child">
                  <div
                    v-for="(child, childIndex) in item.items"
                    :key="childIndex"
                    class="link-child-btn"
                    @click="pageJump(child.link)"
                  >
                    <i v-if="child.icon" :class="`iconfont icon-${child.icon}`" />
                    <span class="name">{{ child.text }}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <!-- 标签 -->
            <div class="tags-list menu-item">
              <span class="link-title"> 标签</span>
              <div class="link-child">
                <div
                  v-for="(item, tag, index) in tagsData"
                  :key="index"
                  class="link-child-btn"
                  @click="pageJump(`/pages/tags/${tag}`)"
                >
                  <span class="name">{{ tag }}</span>
                  <sup class="num">{{ item.count }}</sup>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
const router = useRouter();
const { theme } = useData();

// 菜单数据
const { nav, tagsData } = theme.value;

// 页面跳转
const pageJump = (url) => {
  if (!url) return false;
  store.changeShowStatus("mobileMenuShow");
  router.go(url);
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  .menu-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .menu-content {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 300px;
    border-radius: 12px 0 0 12px;
    padding: 20px;
    overflow: auto;
    .close-control {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      padding: 0;
      transition:
        background-color 0.3s,
        opacity 0.3s;
      border-radius: 50%;
      cursor: pointer;
      .iconfont {
        font-size: 18px;
        line-height: 1;
        color: var(--main-font-second-color);
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
    .menu-list {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .menu-item {
      margin-bottom: 12px;
      .link-title {
        font-size: 14px;
        margin-bottom: 12px;
        display: inline-block;
        color: var(--main-font-second-color);
      }
      .link-child {
        display: grid;
        gap: 12px;
        grid-template-columns: 1fr 1fr;
        .link-child-btn {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          border-radius: 8px;
          padding: 10px 12px;
          background-color: var(--main-card-background);
          border: 1px solid var(--main-card-border);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
          font-size: 15px;
          .iconfont {
            margin-right: 6px;
            opacity: 0.6;
          }
          .name {
            max-width: 80px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .num {
            opacity: 0.4;
            font-size: 12px;
            margin-bottom: auto;
            margin-left: 4px;
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    hr {
      margin: 1rem 0;
      opacity: 0.4;
      border: 1px dashed var(--main-font-second-color);
    }
  }
}
</style>
