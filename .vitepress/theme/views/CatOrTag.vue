<!-- 分类 -->
<template>
  <div class="cat-or-tag">
    <div class="title">
      <h1 class="title-name">{{ type === "categories" ? "全部分类" : "全部标签" }}</h1>
      <span v-if="type === 'categories'" class="title-num">
        共有 {{ Object.keys(theme.categoriesData)?.length || 0 }} 个分类
      </span>
      <span v-else class="title-num">
        共有 {{ Object.keys(theme.tagsData)?.length || 0 }} 个标签
      </span>
    </div>
    <div v-if="type === 'categories'" class="type-lists">
      <a
        v-for="(item, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        class="type-item s-card"
      >
        <i class="iconfont icon-folder" />
        <span class="name">{{ key }}</span>
        <span class="num">{{ item.count }}</span>
      </a>
    </div>
    <div v-else class="type-lists">
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${key}`"
        class="type-item s-card"
      >
        <i class="iconfont icon-hashtag" />
        <span class="name">{{ key }}</span>
        <span class="num">{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
const { theme } = useData();
const props = defineProps({
  // 页面类型
  type: {
    type: String,
    default: "categories",
  },
});
</script>

<style lang="scss" scoped>
.cat-or-tag {
  min-height: 400px;
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-name {
      font-size: 1.875rem;
      margin-bottom: 0;
    }
    .title-num {
      margin-top: 20px;
      font-size: 1.125rem;
      opacity: 0.6;
    }
  }
  .type-lists {
    padding: 2rem 0 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    .type-item {
      font-size: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0.5em;
      .name {
        font-weight: bold;
        transition: color 0.3s;
      }
      .iconfont {
        margin-right: 8px;
        font-size: 1.25rem;
        opacity: 0.6;
        transition: color 0.3s;
      }
      .num {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        padding: 6px 4px;
        margin-left: 8px;
        min-width: 35px;
        border-radius: 8px;
        background-color: var(--main-card-border);
      }
      &:hover {
        transform: scale(1.05);
        background-color: var(--main-color);
        .name,
        .iconfont {
          color: var(--main-card-background);
        }
      }
    }
  }
}
</style>
