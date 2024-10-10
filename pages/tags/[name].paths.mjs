import { getAllPosts, getAllType } from "../../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();
const tagsData = getAllType(postData);

// 标签动态路由
export default {
  paths() {
    const pages = [];
    // 生成每一页的路由参数
    Object.keys(tagsData).forEach((key) => {
      pages.push({ params: { name: key.toString() } });
    });
    console.info("标签动态路由：", pages);
    return pages;
  },
};
