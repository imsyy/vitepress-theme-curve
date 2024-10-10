<!-- 首页 -->
<template>
  <div class="home">
    <Banner v-if="showHeader" :height="store.bannerType" />
    <div class="home-content">
      <div class="posts-content">
        <!-- 分类总览 -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" />
        <!-- 文章列表 -->
        <PostList :listData="postData" />
        <!-- 分页 -->
        <Pagination
          :total="allListTotal"
          :page="Number(page)"
          :limit="postSize"
          :useParams="showCategories || showTags ? true : false"
          :routePath="
            showCategories
              ? `/pages/categories/${showCategories}`
              : showTags
                ? `/pages/tags/${showTags}`
                : ''
          "
        />
      </div>
      <!-- 侧边栏 -->
      <Aside />
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const { theme } = useData();
const store = mainStore();
const props = defineProps({
  // 显示首页头部
  showHeader: {
    type: Boolean,
    default: false,
  },
  // 当前页数
  page: {
    type: Number,
    default: 1,
  },
  // 显示分类
  showCategories: {
    type: [null, String],
    default: null,
  },
  // 显示标签
  showTags: {
    type: [null, String],
    default: null,
  },
});

// 每页文章数
const postSize = theme.value.postSize;

// 列表总数量
const allListTotal = computed(() => {
  const data = props.showCategories
    ? theme.value.categoriesData[props.showCategories]?.articles
    : props.showTags
      ? theme.value.tagsData[props.showTags]?.articles
      : theme.value.postData;
  // 返回数量
  return data ? data.length : 0;
});

// 获得当前页数
const getCurrentPage = () => {
  if (props.showCategories || props.showTags) {
    if (typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (!page) return 0;
    const currentPage = Number(page);
    return currentPage ? currentPage - 1 : 0;
  }
  return props.page ? props.page - 1 : 0;
};

// 根据页数计算列表数据
const postData = computed(() => {
  const page = getCurrentPage();
  console.log("当前页数：", page);
  let data = null;
  // 分类数据
  if (props.showCategories) {
    data = theme.value.categoriesData[props.showCategories]?.articles;
  }
  // 标签数据
  else if (props.showTags) {
    data = theme.value.tagsData[props.showTags]?.articles;
  }
  // 文章数据
  else {
    data = theme.value.postData;
  }
  // 返回列表
  return data ? data.slice(page * postSize, page * postSize + postSize) : [];
});

// 恢复滚动位置
const restoreScrollY = (val) => {
  if (typeof window === "undefined" || val) return false;
  const scrollY = store.lastScrollY;
  nextTick().then(() => {
    console.log("滚动位置：", scrollY);
    // 平滑滚动
    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
    // 清除滚动位置
    store.lastScrollY = 0;
  });
};

// 监听加载结束
watch(
  () => store.loadingStatus,
  (val) => restoreScrollY(val),
);
</script>

<style lang="scss" scoped>
.home {
  .home-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    .posts-content {
      width: calc(100% - 300px);
      transition: width 0.3s;
    }
    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }
    @media (max-width: 1200px) {
      .posts-content {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
}
</style>
