<template>
  <div class="copyright s-card">
    <div class="title">
      <span class="post-name">{{ postData?.title || "未命名文章" }}</span>
      <a :href="theme.siteMeta.site + route.path" class="post-link" target="_blank">
        {{ theme.siteMeta.site + route.path }}
      </a>
    </div>
    <div class="post-meta">
      <div class="meta-item">
        <span class="tip">作者</span>
        <span class="name">{{ theme.siteMeta.author.name }}</span>
      </div>
      <div class="meta-item">
        <span class="tip">发布于</span>
        <span class="name">{{ formatTimestamp(postData?.date) }}</span>
      </div>
      <div class="meta-item">
        <span class="tip">更新于</span>
        <span class="name">{{ formatTimestamp(postData?.lastModified) }}</span>
      </div>
      <div class="meta-item cc">
        <span class="tip">许可协议</span>
        <a
          class="name"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>
      </div>
    </div>
    <span class="meta-tip">署名-非商业性使用-相同方式共享 4.0 国际</span>
  </div>
</template>

<script setup>
import { formatTimestamp } from "@/utils/helper";

const { theme } = useData();
const props = defineProps({
  // 文章数据
  postData: {
    type: Object,
    default: {},
  },
});
const route = useRoute();
</script>

<style lang="scss" scoped>
.copyright {
  position: relative;
  background-color: var(--main-card-second-background);
  padding: 18px;
  margin-top: 2rem;
  overflow: hidden;
  .title {
    display: flex;
    flex-direction: column;
    .post-link {
      margin-top: 2px;
      font-size: 14px;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }
  .post-meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;
    .meta-item {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
      .name {
        margin-top: 4px;
        font-size: 14px;
        opacity: 0.6;
        transition:
          color 0.3s,
          opacity 0.3s;
        cursor: pointer;
      }
      &.cc {
        .name {
          &:hover {
            opacity: 1;
            color: var(--main-color);
          }
        }
      }
    }
  }
  .meta-tip {
    opacity: 0.4;
  }
  &::after {
    content: "\e021";
    position: absolute;
    top: -4rem;
    right: -4rem;
    font-family: "iconfont";
    opacity: 0.1;
    font-size: 16rem;
    transform: rotate(334deg);
  }
  @media (max-width: 768px) {
    .post-meta {
      display: none;
    }
    .meta-tip {
      display: inline-block;
      margin-top: 12px;
      font-size: 14px;
    }
  }
}
</style>
