<!-- 链接卡片 -->
<template>
  <a :href="url" :target="isOutLink ? '_blank' : null" class="link-card s-card hover">
    <span v-if="isOutLink" class="link-tip">引用站外地址，请注意甄别链接安全性</span>
    <div class="link-data">
      <div class="link-icon">
        <img v-if="icon" class="link-img" :src="icon" alt="link-img" />
        <img
          v-else-if="siteInfo?.iconUrl"
          :src="siteInfo.iconUrl"
          class="link-img"
          alt="link-img"
          @error="siteInfo.iconUrl = null"
        />
        <i v-else class="iconfont icon-link"></i>
      </div>
      <div class="link-desc">
        <!-- 标题 -->
        <span v-if="title" class="link-title">{{ title }}</span>
        <span v-else class="link-title">{{ siteInfo?.title || "暂无标题" }}</span>
        <!-- 描述 -->
        <span v-if="desc" class="link-description">{{ desc }}</span>
        <span v-else class="link-description">{{ siteInfo?.description || "暂无站点描述" }}</span>
      </div>
      <i class="link-go iconfont icon-up"></i>
    </div>
  </a>
</template>

<script setup>
import { getSiteInfo } from "@/api";

const props = defineProps({
  // 地址
  url: {
    type: String,
    default: "",
  },
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 描述
  desc: {
    type: String,
    default: "",
  },
  // 图标
  icon: {
    type: String,
    default: "",
  },
});

// 站点数据
const siteInfo = ref(null);

// 是否为站内链接
const isOutLink = computed(() => {
  const link = props.url;
  if (!link) return false;
  // 是否为站内链接
  return !link.startsWith("/") && (link.startsWith("http://") || link.startsWith("https://"));
});

// 获取站点数据
const getSiteInfoData = async () => {
  const url = props.url;
  if (!url) return false;
  if (props.title || props.desc || props.icon) return false;
  // 获取数据
  const result = await getSiteInfo(url);
  siteInfo.value = result;
};

onMounted(() => {
  getSiteInfoData();
});
</script>

<style lang="scss" scoped>
.link-card {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--main-card-second-background);
  .link-tip {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    opacity: 0.6;
    padding-bottom: 0.8rem;
    margin-bottom: 0.8rem;
    border-bottom: 2px dashed var(--main-card-border);
  }
  .link-data {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .link-icon {
      width: 60px;
      height: 60px;
      min-width: 60px;
      margin-right: 0.8rem;
      border-radius: 12px;
      overflow: hidden;
      .link-img {
        width: 100%;
        height: 100%;
      }
      .iconfont {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        background-color: var(--main-card-border);
      }
    }
    .link-desc {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .link-title {
        margin-bottom: 4px;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow-wrap: break-word;
      }
      .link-description {
        color: var(--main-font-second-color);
        font-size: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        transition: color 0.3s;
      }
    }
    .link-go {
      display: flex;
      margin-left: 12px;
      transform: rotate(90deg);
      transition: color 0.3s;
    }
  }
  &:hover {
    color: var(--main-card-background);
    background-color: var(--main-color);
    .link-data {
      .link-desc {
        .link-description {
          color: var(--main-card-background);
          opacity: 0.6;
        }
      }
      .link-go {
        color: var(--main-card-background);
      }
    }
  }
}
</style>
