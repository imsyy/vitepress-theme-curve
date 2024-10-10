<template>
  <div v-if="type === 'text'" :class="['banner', bannerType]" id="main-banner">
    <h1 class="title">你好，欢迎来到{{ theme.siteMeta.title }}</h1>
    <div class="subtitle">
      <Transition name="fade" mode="out-in">
        <span :key="hitokotoData?.hitokoto" class="text">
          {{ hitokotoData?.hitokoto ? hitokotoData?.hitokoto : theme.siteMeta.description }}
        </span>
      </Transition>
    </div>
    <Transition name="fade" mode="out-in">
      <i v-if="height === 'full'" class="iconfont icon-up" @click="scrollToHome" />
    </Transition>
  </div>
  <div
    v-else-if="type === 'page'"
    :class="['banner-page', 's-card', { image }]"
    :style="{
      backgroundImage: image ? `url(${image})` : null,
    }"
  >
    <div class="top">
      <div class="title">
        <span class="title-small">{{ title }}</span>
        <span class="title-big">{{ desc }}</span>
      </div>
      <div class="top-right">
        <slot name="header-slot" />
      </div>
    </div>
    <slot />
    <div class="footer">
      <div class="footer-left">
        {{ footer }}
      </div>
      <div class="footer-right">
        <slot name="footer-slot" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { getHitokoto } from "@/api";

const store = mainStore();
const { theme } = useData();
const props = defineProps({
  // 类型
  type: {
    type: String,
    default: "text",
  },
  // 高度
  height: {
    type: String,
    default: "half",
  },
  // 标题
  title: {
    type: String,
    default: "这里是标题",
  },
  // 简介
  desc: {
    type: String,
    default: "这里是简介",
  },
  // 注释
  footer: {
    type: String,
    default: "",
  },
  // 背景
  image: {
    type: String,
    default: "",
  },
});

const hitokotoData = ref(null);
const hitokotoTimeOut = ref(null);

// banner
const bannerType = ref(null);

// 获取一言数据
const getHitokotoData = async () => {
  try {
    const result = await getHitokoto();
    const { hitokoto, from, from_who } = result;
    hitokotoData.value = { hitokoto, from, from_who };
  } catch (error) {
    $message.error("一言获取失败");
    console.error("一言获取失败：", error);
  }
};

// 滚动至首页
const scrollToHome = () => {
  const bannerDom = document.getElementById("main-banner");
  if (!bannerDom) return false;
  scrollTo({
    top: bannerDom.offsetHeight,
    behavior: "smooth",
  });
};

watch(
  () => store.bannerType,
  (val) => {
    bannerType.value = val;
  },
);

onMounted(() => {
  if (props.type === "text") {
    hitokotoTimeOut.value = setTimeout(() => {
      getHitokotoData();
    }, 2000);
  }
  // 更改 banner 类型
  bannerType.value = store.bannerType;
});

onBeforeUnmount(() => {
  clearTimeout(hitokotoTimeOut.value);
});
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fade-up 0.6s 0.1s backwards;
  transition: height 0.3s;
  &.full {
    opacity: 0;
    height: calc(100vh - 70px);
    padding-bottom: 100px;
    animation: fade-up 0.6s 0.5s forwards;
    .subtitle {
      opacity: 0;
      animation: fade-up-opacity 0.8s 0.5s forwards;
    }
  }
  .title {
    font-family: "Site Title";
    font-weight: bold;
    font-size: 2.75rem;
  }
  .subtitle {
    width: 80%;
    font-size: 1.25rem;
    opacity: 0.8;
    animation: fade-up-opacity 0.6s 0.1s backwards;
    .text {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .icon-up {
    font-size: 20px;
    position: absolute;
    bottom: 60px;
    left: calc(50% - 10px);
    transform: rotate(180deg);
    animation: moveDown 2s ease-in-out infinite;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    align-items: flex-start;
    height: 240px;
    .title {
      font-size: 2.25rem;
    }
    .subtitle {
      height: 50px;
      font-size: 1.125rem;
      margin-left: 8px;
      .text {
        text-align: left;
      }
    }
  }
}
.banner-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 380px;
  background-size: cover;
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    .title {
      display: flex;
      flex-direction: column;
      .title-small {
        color: var(--main-font-second-color);
        font-size: 0.875rem;
      }
      .title-big {
        font-size: 2.25rem;
        font-weight: bold;
        line-height: 1.2;
        margin-top: 12px;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    .footer-left {
      margin-top: auto;
      color: var(--main-font-second-color);
      opacity: 0.8;
    }
  }
  &.image {
    color: #fff !important;
    .top {
      .title-small {
        color: #fff;
        opacity: 0.6;
      }
    }
    .footer {
      .footer-left {
        color: #fff;
      }
      :deep(.iconfont) {
        color: #fff !important;
      }
    }
  }
  @media (max-width: 1200px) {
    min-height: 300px;
  }
  @media (max-width: 768px) {
    min-height: 260px;
    .top-right,
    .footer-right {
      display: none;
    }
  }
}
</style>
