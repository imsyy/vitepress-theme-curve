import { getAllPosts } from "../.vitepress/theme/utils/getPostData.mjs";
import { getThemeConfig } from "../.vitepress/init.mjs";

const postData = await getAllPosts();
const themeConfig = await getThemeConfig();

// 每页文章数
const postsPerPage = themeConfig.postSize;

// 计算总页数
const totalPages = Math.ceil(postData.length / postsPerPage);

// 文章分页动态路由
export default {
  paths() {
    const pages = [];
    // 生成每一页的路由参数
    for (let pageNum = 2; pageNum <= totalPages; pageNum += 1) {
      pages.push({ params: { num: pageNum.toString() } });
    }
    console.info("文章分页动态路由：", pages);
    return pages;
  },
};
