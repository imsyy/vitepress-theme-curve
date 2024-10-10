<!-- 分页 -->
<template>
  <div v-if="total > 0" class="pagination">
    <div
      v-if="currentPage > 1"
      class="page-item prev"
      @click="
        jumpPage(
          currentPage === 2 ? `${routePath}` : `${routePath}/page/${currentPage - 1}`,
          currentPage === 2 ? 1 : currentPage - 1,
        )
      "
    >
      <i class="iconfont icon-page-right" />
      <span class="page-text">上页</span>
    </div>
    <div class="page-number">
      <div
        v-for="(item, index) in pageNumber"
        :key="index"
        :class="[item === '...' ? 'point' : 'page-item', { choose: item === currentPage }]"
        @click="jumpPage(item === 1 ? `${routePath}` : `${routePath}/page/${item}`, item)"
      >
        <span class="page-num">{{ item }}</span>
      </div>
      <!-- 快速跳转 -->
      <div :class="['fast-jump', { focus: inputFocus }]" title="快速跳转">
        <input
          v-model.number="jumpInput"
          :min="1"
          :max="totalPages"
          @focus="inputFocus = true"
          @blur="fastJump"
          @input="validateInput"
          @keydown.enter="fastJump"
        />
        <i :class="['iconfont icon-arrow-right', { click: jumpInput }]" @click.stop="fastJump" />
      </div>
    </div>
    <div
      v-if="currentPage * limit < total"
      class="page-item next"
      @click="jumpPage(`${routePath}/page/${currentPage + 1}`, currentPage + 1)"
    >
      <span class="page-text">下页</span>
      <i class="iconfont icon-page-right" />
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

// 分页数据
const props = defineProps({
  // 总数
  total: {
    type: Number,
    default: 0,
  },
  // 当前页数
  page: {
    type: Number,
    default: 1,
  },
  // 每页显示数量
  limit: {
    type: Number,
    default: 8,
  },
  // 跳转目录
  routePath: {
    type: String,
    default: "",
  },
  // 使用参数
  useParams: {
    type: Boolean,
    default: false,
  },
});

// 快速跳转数据
const jumpInput = ref(null);
const inputFocus = ref(false);

// 页数数据
const currentPage = ref(props.page);
const totalPages = computed(() => Math.ceil(props.total / props.limit));

// 分页指示器数据
const pageNumber = computed(() => {
  let pages = [];
  const current = currentPage.value;
  const total = totalPages.value;
  const wingSize = 2; // 当前页前后要显示的页码数
  let startPage = Math.max(current - wingSize, 2);
  let endPage = Math.min(current + wingSize, total - 1);
  // 总是显示第一页
  pages.push(1);
  // 当 startPage > 2 时，前面需要显示省略号
  if (startPage > 2) {
    pages.push("...");
  } else {
    // 如果 startPage 是 2，不需要省略号，直接显示第二页
    startPage = 2;
  }
  // 显示中间范围的页码
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  // 当 endPage < totalPages-1 时，后面需要显示省略号
  if (endPage < total - 1) {
    pages.push("...");
  } else {
    // 如果 endPage 是 totalPages-1，不需要省略号，直接显示倒数第二页
    if (endPage === total - 1) endPage = total - 1;
  }
  // 总是显示最后一页，除非只有一页
  if (total > 1) pages.push(total);
  return pages;
});

// 检查输入
const validateInput = () => {
  const numericValue = Number(jumpInput.value);
  if (!Number.isInteger(numericValue) || numericValue < 1) {
    jumpInput.value = null;
  } else if (numericValue > totalPages.value) {
    jumpInput.value = totalPages.value;
  } else {
    jumpInput.value = numericValue;
  }
};

// 跳转页面
const jumpPage = (url, page) => {
  // 使用参数跳转
  if (props.useParams) {
    if (page === 1) {
      router.go(`${props.routePath}`);
    } else {
      router.go(`${props.routePath}?page=${page}`);
    }
  }
  // 正常跳转
  else {
    router.go(url);
  }
};

// 快速跳转
const fastJump = () => {
  inputFocus.value = false;
  if (!jumpInput.value) return false;
  jumpPage(
    jumpInput.value === 1 ? `${props.routePath}` : `${props.routePath}/page/${jumpInput.value}`,
    jumpInput.value,
  );
};

// 检查当前路径参数
const checkCurrentPage = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  if (page && props.useParams) {
    currentPage.value = Number(page);
  }
};

onMounted(() => {
  checkCurrentPage();
});
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  animation: fade-up 0.6s 0.4s backwards;
  .page-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    box-shadow: 0 8px 16px -4px var(--main-border-shadow);
    transition:
      border-color 0.3s,
      box-shadow 0.3s;
    cursor: pointer;
    &.prev,
    &.next {
      position: absolute;
      width: 80px;
      left: 0;
      .iconfont {
        transform: rotate(180deg);
        transition:
          color 0.3s,
          transform 0.3s;
      }
      .page-text {
        opacity: 0;
        margin-left: 4px;
        margin-right: -36px;
        transition:
          opacity 0.3s,
          margin 0.3s;
      }
    }
    &.next {
      left: auto;
      right: 0;
      .iconfont {
        transform: rotate(0);
      }
      .page-text {
        margin-right: 4px;
        margin-left: -36px;
      }
    }
    &:hover {
      border-color: var(--main-color);
      box-shadow: 0 8px 16px -4px var(--main-color-bg);
      .iconfont {
        color: var(--main-color);
      }
      &.prev,
      &.next {
        color: var(--main-color);
        .page-text {
          opacity: 1;
          margin-right: 0;
        }
      }
      &.next {
        .page-text {
          margin-right: 4px;
          margin-left: 0;
        }
      }
    }
  }
  .page-number {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .page-item {
      margin: 0 6px;
      &.choose {
        color: var(--main-card-background);
        border-color: var(--main-color);
        background-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
      }
    }
    .point {
      margin: 0 4px;
      transform: translateY(-8px);
      font-size: 22px;
    }
    .fast-jump {
      position: relative;
      margin: 0 6px;
      input {
        border: none;
        outline: none;
        background: none;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        padding: 0 8px;
        font-size: 16px;
        color: var(--main-font-color);
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        transition: all 0.3s;
      }
      .iconfont {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background-color: var(--main-card-background);
        transition:
          color 0.3s,
          opacity 0.3s,
          background-color 0.3s;
        cursor: pointer;
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
        }
      }
      &.focus,
      &:hover {
        input {
          width: 100px;
          border-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-color-bg);
        }
        .iconfont {
          opacity: 0.2;
          pointer-events: none;
          &.click {
            opacity: 1;
            pointer-events: all;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .page-number {
      display: none;
    }
    .page-item {
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
