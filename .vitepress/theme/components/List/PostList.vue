<!-- 文章列表 -->
<template>
  <div class="post-lists" :class="{'layout-grid': layoutType === 'twoColumns'}" :style="gridStyle">
    <div
      v-for="(item, index) in listData"
      :key="index"
      :class="['post-item', 's-card', 'hover',{ simple, cover: showCover(item),[`cover-${layoutType}`]: showCover(item) }]"
      :style="{ animationDelay: `${0.4 + index / 10}s` }"
      @click="toPost(item.regularPath)"
    >
      <div v-if="!simple && showCover(item)" class="post-cover">
        <img :src="getCover(item)" :alt="item.title">
      </div>
      
      <div class="post-content">
        <div v-if="!simple && item?.categories" class="post-category">
          <span v-for="cat in item?.categories" :key="cat" class="cat-name">
            <i class="iconfont icon-folder" />
            {{ cat }}
          </span>
          <!-- 置顶 -->
          <span v-if="item?.top" class="top">
            <i class="iconfont icon-align-top" />
            置顶
          </span>
        </div>
        <span class="post-title">{{ item.title }}</span>
        <span v-if="item?.description" class="post-desc">
          {{ item.description }}
        </span>
        <div v-if="!simple" class="post-meta">
          <div v-if="item?.tags" class="post-tags">
            <span
              v-for="tags in item?.tags"
              :key="tags"
              class="tags-name"
              @click.stop="router.go(`/pages/tags/${tags}`)"
            >
              <i class="iconfont icon-hashtag" />
              {{ tags }}
            </span>
          </div>
          <span class="post-time">{{ formatTimestamp(item?.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { formatTimestamp } from "@/utils/helper";

const store = mainStore();
const router = useRouter();

const props = defineProps({
  // 列表数据
  listData: {
    type: [Array, String],
    default: () => [],
  },
  // 简洁模式
  simple: {
    type: Boolean,
    default: false,
  },
});

const { theme: themeConfig } = useData()

// 计算布局类型
const layoutType = computed(() => 
  themeConfig.value?.cover?.twoColumns ? 'twoColumns' : themeConfig.value?.cover?.showCover?.coverLayout ?? 'left'
)

// 计算网格样式
const gridStyle = computed(() => 
  layoutType.value === 'twoColumns' ? {
    '--grid-columns': 2,
    '--grid-gap': '1rem'
  } : {}
)

// 判断是否显示封面
const showCover = () => themeConfig.value?.cover?.showCover?.enable

// 获取封面图片 按优先级获取：cover > defaultCover > false
const getCover = ({ cover: itemCover }) => {
  const { cover } = themeConfig.value ?? {}
  
  if (!cover?.showCover?.enable) return false
  if (itemCover) return itemCover
  
  return Array.isArray(cover.showCover.defaultCover) 
    ? cover.showCover.defaultCover[Math.floor(Math.random() * cover.showCover.defaultCover.length)]
    : false
}

// 前往文章
const toPost = (path) => {
  // 记录滚动位置
  if (typeof window !== "undefined") {
    const scrollY = window.scrollY;
    store.lastScrollY = scrollY;
  }
  // 跳转文章
  router.go(path);
};
</script>

<style lang="scss" scoped>
.post-lists {
  .post-item {
    padding: 0!important;
    display: flex;
    margin-bottom: 1rem;
    animation: fade-up 0.6s 0.4s backwards;
    cursor: pointer;
    overflow: hidden;
    height: 200px;
    
    .post-cover {
      flex: 0 0 35%;
      overflow: hidden;
      transform: translateZ(0);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform-origin: center center;
        will-change: transform, filter;
        transition: transform 0.5s ease-out, filter 0.5s ease-out;
        backface-visibility: hidden;
      }
    }

    .post-content {
      flex: 1;
      padding: 1.6rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .post-category {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        color: var(--main-font-second-color);
        font-size: 14px;
        .cat-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          .iconfont {
            opacity: 0.8;
            margin-right: 6px;
            color: var(--main-font-second-color);
          }
        }
        .top {
          margin-left: 12px;
          color: var(--main-color);
          .iconfont {
            opacity: 0.8;
            color: var(--main-color);
          }
        }
      }
      .post-title {
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
        margin: 0.6rem 0;
        transition: color 0.3s;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .post-desc {
        margin-top: -0.4rem;
        margin-bottom: 0.8rem;
        opacity: 0.8;
        line-height: 30px;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .post-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: var(--main-font-second-color);
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          opacity: 0.8;
          margin-right: 20px;
          overflow: hidden;
          mask: linear-gradient(
            90deg,
            #fff 0,
            #fff 90%,
            hsla(0, 0%, 100%, 0.6) 95%,
            hsla(0, 0%, 100%, 0) 100%
          );
          .tags-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 12px;
            white-space: nowrap;
            transition: color 0.3s;
            .iconfont {
              font-weight: normal;
              opacity: 0.6;
              margin-right: 4px;
              transition: color 0.3s;
            }
            &:hover {
              color: var(--main-color);
              .iconfont {
                color: var(--main-color);
              }
            }
          }
          @media (max-width: 768px) {
            flex-wrap: nowrap;
          }
        }
        .post-time {
          opacity: 0.6;
          font-size: 13px;
          white-space: nowrap;
        }
      }
    }
    &.simple {
      animation: none;
      padding: 0.5rem 1.4rem;
      background-color: var(--main-card-second-background);
      height: auto;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      .post-cover img {
        filter: brightness(.8);
        transform: scale(1.05);
      }
      .post-content {
        .post-title {
          color: var(--main-color);
        }
      }
    }
    &:active {
      transform: scale(0.98);
    }
    @media (max-width: 768px) {
      flex-direction: column;
      height: auto;
      
      .post-cover {
        flex: none;
        width: 100%;
        height: 200px;
      }
    }

    // 封面靠左
    &.cover-left {
      flex-direction: row;
    }

    // 封面靠右
    &.cover-right {
      flex-direction: row-reverse;
    }

    // 交替布局
    &.cover-both {
      &:nth-child(odd) {
        flex-direction: row;
      }
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }

    // 移动端垂直布局
    @media (max-width: 768px) {
      &.cover-left,
      &.cover-right,
      &.cover-both {
        flex-direction: column !important;
      }
    }
  }

  // 网格布局
  &.layout-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns, 2), 1fr);
    gap: var(--grid-gap, 1rem);

    .post-item {
      margin: 0;
      flex-direction: column;
      height: auto;

      .post-cover {
        flex: none;
        width: 100%;
        height: 225px;
      }

      .post-content {
        flex: 1;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
