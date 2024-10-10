<template>
  <div class="archives s-card">
    <div class="title">
      <h1 class="name">文章</h1>
      <sup v-if="theme.postData?.length" class="num">{{ theme.postData.length }}</sup>
    </div>
    <div class="archives-list">
      <div v-for="(year, index) in theme.archivesData.year" :key="index" class="year-list">
        <span class="year">{{ year }}</span>
        <div class="posts">
          <div
            v-for="(post, postIndex) in theme.archivesData.data[year].articles"
            :key="postIndex"
            class="posts-item s-card hover"
            @click="router.go(post.regularPath)"
          >
            <span class="title">{{ post.title }}</span>
            <div class="tags">
              <a
                v-for="(tags, tagsIndex) in post.tags"
                :key="tagsIndex"
                :href="`/pages/tags/${tags}`"
                class="type-item"
              >
                <i class="iconfont icon-hashtag" />
                <span class="name">{{ tags }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { theme } = useData();
const router = useRouter();
</script>

<style lang="scss" scoped>
.archives {
  padding: 2rem;
  .title {
    display: flex;
    margin-bottom: 1rem;
    .name {
      margin: 0;
      border-bottom: none;
    }
    .num {
      margin-left: 8px;
      font-size: 20px;
      font-weight: bold;
      opacity: 0.6;
    }
  }
  .archives-list {
    .year-list {
      margin-bottom: 2rem;
      .year {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 6px;
        padding-left: 12px;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 1rem;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          width: 4px;
          height: 70%;
          background-color: var(--main-color);
          border-radius: 8px;
        }
      }
      .posts {
        .posts-item {
          padding: 20px;
          margin-bottom: 1rem;
          .title {
            margin-bottom: 16px;
            font-size: 18px;
            font-weight: bold;
            transition: color 0.3s;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            opacity: 0.6;
            .type-item {
              font-size: 14px;
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-right: 8px;
              .name {
                transition: color 0.3s;
              }
              .iconfont {
                margin-right: 2px;
                transition: color 0.3s;
              }
              &:hover {
                .name,
                .iconfont {
                  color: var(--main-color);
                }
              }
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            .title {
              color: var(--main-color);
            }
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
