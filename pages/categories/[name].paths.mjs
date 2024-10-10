import { getAllPosts, getAllCategories } from "../../.vitepress/theme/utils/getPostData.mjs";

const postData = await getAllPosts();
const categoriesData = getAllCategories(postData);

// 分类动态路由
export default {
  paths() {
    const pages = [];
    // 生成每一页的路由参数
    Object.keys(categoriesData).forEach((key) => {
      pages.push({ params: { name: key.toString() } });
    });
    console.info("分类动态路由：", pages);
    return pages;
  },
};
