<!-- 懒加载 -->
<template>
  <div v-if="!load" ref="box" :style="{ height, width }" class="loading" />
  <slot v-else />
  <div v-if="useFriendsLink" class="hidden">
    <!-- 适配友链朋友圈 -->
    <img :data-lazy-src="useFriendsLink" class="cf-friends-avatar" alt="cover" />
  </div>
</template>

<script setup>
const props = defineProps({
  // 兼容友链朋友圈
  useFriendsLink: {
    type: [Boolean, String],
    default: false,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});

// IntersectionObserver
let observer = null;

// 是否加载
const load = ref(false);
// 加载元素
const box = ref(null);

// 初始化 IntersectionObserver
const initLazyIntersectionObserver = (fn) => {
  const observer = new IntersectionObserver((entrys) => entrys.forEach((entry) => fn(entry)), {
    rootMargin: "0px",
    threshold: 0,
  });
  return observer;
};

onMounted(() => {
  observer = initLazyIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      // 当内容可见
      load.value = true;
      observer.unobserve(box.value);
      observer = null;
    }
  });
  // 观察
  observer.observe(box.value);
});

onBeforeUnmount(() => observer && observer.unobserve(box.value));
</script>

<style lang="scss" scoped>
.loading {
  background: linear-gradient(
    90deg,
    var(--main-card-border) 25%,
    var(--main-card-background) 37%,
    var(--main-card-border) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
.hidden {
  display: none;
}
</style>
