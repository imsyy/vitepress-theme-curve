---
title: 分类
aside: false
padding: false
---

<script setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import Home from "@/views/Home.vue"

const { params, site } = useData();

onMounted(() => {
  document.title = `分类：${params.value.name} | ${site.value.title}`;
});
</script>

<Home :showHeader="false" :showCategories="params.name" />
