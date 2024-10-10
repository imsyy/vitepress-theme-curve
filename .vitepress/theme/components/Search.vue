<!-- 全局搜索 -->
<template>
  <Modal
    :show="store.searchShow"
    title="全局搜索"
    titleIcon="search"
    @mask-click="store.changeShowStatus('searchShow')"
    @modal-close="store.changeShowStatus('searchShow')"
  >
    <ais-instant-search
      :search-client="searchClient"
      :future="{
        preserveSharedStateOnUnmount: true,
      }"
      index-name="imsyy"
      @state-change="searchChange"
    >
      <ais-configure :hits-per-page.camel="8" />
      <ais-search-box placeholder="想要搜点什么" autofocus />
      <ais-hits v-if="hasSearchValue">
        <template v-slot="{ items }">
          <Transition name="fade" mode="out-in">
            <div v-if="formatSearchData(items)?.length" class="search-list">
              <div
                v-for="(item, index) in formatSearchData(items)"
                :key="index"
                class="search-item s-card hover"
                @click="jumpSearch(item.url)"
              >
                <p class="title" v-html="item.title" />
                <p v-if="item?.anchor" class="anchor" v-html="item.anchor" />
                <p v-if="item?.content" class="content s-card" v-html="item.content" />
              </div>
            </div>
            <div v-else class="no-result">
              <i class="iconfont icon-search-empty" />
              <span class="text">搜索结果为空</span>
            </div>
          </Transition>
        </template>
      </ais-hits>
      <ais-pagination v-if="hasSearchValue" />
      <ais-stats>
        <template v-slot="{ processingTimeMS }">
          <div class="information">
            <span v-if="hasSearchValue" class="text"> 本次用时 {{ processingTimeMS }} 毫秒 </span>
          </div>
          <a class="power" href="https://www.algolia.com/" target="_blank">
            <i class="iconfont icon-algolia" />
            <span class="name">Algolia</span>
          </a>
        </template>
      </ais-stats>
    </ais-instant-search>
  </Modal>
</template>

<script setup>
import { mainStore } from "@/store";
import { liteClient } from "algoliasearch/lite";

const store = mainStore();
const router = useRouter();

const { theme } = useData();
const { appId, apiKey } = theme.value.search;

const searchClient = liteClient(appId, apiKey);

// 是否具有搜索词
const hasSearchValue = ref(false);

// 搜索变化
const searchChange = ({ uiState, setUiState }) => {
  const searchData = Object.values(uiState);
  hasSearchValue.value = searchData.length > 0 && searchData[0].query?.length > 0;
  setUiState(uiState);
};

// 处理搜索结果
const formatSearchData = (data) => {
  const results = [];
  // 遍历搜索结果
  for (let i = 0; i < data.length; i++) {
    const search = data[i];
    // 若无 anchor
    // if (search.anchor === "" || search.anchor === "app") continue;
    // 获取数据
    const url = search?.url;
    const type = search.type === "lvl1" ? "post" : "content";
    const title = search._highlightResult?.hierarchy?.lvl1?.value;
    const anchor = search._highlightResult?.hierarchy?.[search.type]?.value;
    const content = search._highlightResult?.content?.value;
    // 生成搜索数据
    const searchData = { url, type, title, anchor, content };
    results.push(searchData);
  }
  console.log(results);
  return results;
};

// 跳转搜索结果
const jumpSearch = (url) => {
  store.changeShowStatus("searchShow");
  router.go(url);
};

onBeforeUnmount(() => {
  hasSearchValue.value = false;
});
</script>

<style lang="scss">
.ais-InstantSearch {
  height: 100%;
  .ais-SearchBox {
    height: 40px;
    width: 100%;
    .ais-SearchBox-input {
      width: 100%;
      outline: none;
      border-radius: 8px;
      font-size: 16px;
      padding: 0.6rem 1rem;
      color: var(--main-font-color);
      font-family: var(--main-font-family);
      border: 1px solid var(--main-card-border);
      background-color: var(--main-card-second-background);
      transition:
        border-color 0.3s,
        box-shadow 0.3s;
      &:focus {
        border-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
      }
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
    .ais-SearchBox-loadingIndicator,
    .ais-SearchBox-submit,
    .ais-SearchBox-reset {
      display: none;
    }
  }
  .ais-Hits {
    margin-top: 20px;
    min-height: 300px;
    height: 100%;
    .no-result {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 40px;
        margin-bottom: 12px;
      }
      .text {
        font-size: 18px;
        opacity: 0.6;
      }
    }
    .search-list {
      .search-item {
        margin-bottom: 12px;
        .title {
          display: inline;
          font-size: 16px;
          margin-bottom: 6px;
        }
        .anchor {
          margin-top: 6px;
          color: var(--main-font-second-color);
          font-size: 14px;
          &::before {
            content: "# ";
          }
        }
        .content {
          color: var(--main-font-second-color);
          margin-top: 0.8rem;
          font-size: 12px;
          padding: 8px;
          border-radius: 8px;
        }
        p {
          margin: 0;
          mark {
            background-color: transparent;
            color: var(--main-color);
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .ais-Pagination {
    margin-top: 20px;
    .ais-Pagination-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .ais-Pagination-item {
        margin: 0 4px;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        .ais-Pagination-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          &:hover {
            color: var(--main-font-color);
          }
        }
        &:hover {
          color: var(--main-font-color);
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--selected {
          font-weight: bold;
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--disabled,
        &.ais-Pagination-item--nextPage,
        &.ais-Pagination-item--lastPage {
          opacity: 0.8;
        }
      }
    }
  }
  .ais-Stats {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    opacity: 0.8;
    font-size: 14px;
    .power {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      opacity: 0.6;
      transition:
        color 0.3s,
        opacity 0.3s;
      .iconfont {
        margin-right: 4px;
        font-size: 20px;
        transition: color 0.3s;
      }
      .name {
        font-weight: bold;
      }
      &:hover {
        opacity: 1;
        color: var(--main-color);
        .iconfont {
          color: var(--main-color);
        }
      }
    }
    @media (max-width: 512px) {
      justify-content: center;
      .information {
        display: none;
      }
    }
  }
}
</style>
