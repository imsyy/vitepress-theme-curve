<template>
  <footer id="main-footer" class="main-footer">
    <div class="footer-content">
      <div class="copyright">
        <span class="time">@ 2019 - {{ thisYear }} By </span>
        <a :href="theme.siteMeta.author.link" class="author link" target="_blank">
          {{ theme.siteMeta.author.name }}
        </a>
        <a class="icp link" href="https://beian.miit.gov.cn/" target="_blank">
          <i class="iconfont icon-safe" />
          {{ theme.icp }}
        </a>
        <a
          class="upyun link"
          href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
          target="_blank"
        >
          <i class="iconfont icon-upyun" />
          又拍云
        </a>
      </div>
      <div class="meta">
        <a class="power link" href="https://vitepress.dev/" target="_blank">
          <span class="by">Powered by</span>
          <span class="name">VitePress</span>
        </a>
        <a class="theme link" href="https://github.com/imsyy/vitepress-theme-curve" target="_blank">
          <span class="name">主题</span>
        </a>
        <a class="rss link" href="https://blog.imsyy.top/rss.xml" target="_blank">
          <i class="iconfont icon-rss" />
          <span class="name">订阅</span>
        </a>
        <a
          class="cc link"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          <i class="iconfont icon-line" />
          <i class="iconfont icon-by-line" />
          <i class="iconfont icon-nc-line" />
          <i class="iconfont icon-nd-line" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const store = mainStore();
const { theme } = useData();
const { footerIsShow } = storeToRefs(store);

// 视窗监听器
const observer = ref(null);

// 实时年份
const thisYear = computed(() => new Date().getFullYear());

// 监听页脚视窗
const isShowFooter = () => {
  const footerDom = document.getElementById("main-footer");
  if (!footerDom) return false;
  if (observer.value) observer.value?.disconnect();
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      footerIsShow.value = entry.isIntersecting ? true : false;
    });
  });
  // 添加监视器
  observer.value?.observe(footerDom);
};

onMounted(() => {
  isShowFooter();
});

onBeforeUnmount(() => {
  if (observer.value) observer.value?.disconnect();
});
</script>

<style lang="scss" scoped>
.main-footer {
  display: flex;
  margin-top: 1rem;
  padding: 1rem 0;
  background-color: var(--main-card-background);
  border-top: 1px solid var(--main-card-border);
  overflow: hidden;
  animation: show 0.3s backwards;
  transition:
    color 0.3s,
    border 0.3s,
    background-color 0.3s;
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    color: var(--main-font-color);
    line-height: 1;
    min-height: 32px;
    .copyright {
      .icp {
        .iconfont {
          font-size: 20px;
          opacity: 0.6;
        }
      }
      .upyun {
        .iconfont {
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      .power {
        margin-right: 4px;
        .by {
          font-weight: normal;
          opacity: 0.8;
          margin-right: 6px;
        }
      }
      .rss {
        margin-right: 4px;
        .iconfont {
          font-weight: normal;
          margin-right: 6px;
        }
      }
      .cc {
        .iconfont {
          margin: 0 2px;
          font-weight: normal;
        }
      }
    }
    .link {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 8px;
      margin: 0 2px;
      height: 38px;
      border-radius: 12px;
      transition:
        color 0.3s,
        background-color 0.3s;
      cursor: pointer;
      .iconfont {
        font-size: 22px;
        margin-right: 4px;
        transition: color 0.3s;
      }
      &:hover {
        color: var(--main-color);
        background-color: var(--main-color-bg);
        .iconfont {
          color: var(--main-color);
        }
      }
    }
    @media (max-width: 768px) {
      font-size: 14px;
      .meta {
        display: none;
      }
    }
    @media (max-width: 420px) {
      .copyright {
        .icp {
          .iconfont {
            display: none;
          }
        }
      }
    }
  }
}
</style>
