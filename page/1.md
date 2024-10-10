---
title: 正在重定向
---

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vitepress"
    
const router = useRouter();

onMounted(() => router.go("/"));
</script>