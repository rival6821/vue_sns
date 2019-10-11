<template>
  <v-container>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";

export default {
  data() {
    return {
      name: "Nuxt.js"
    };
  },
  components: {
    PostCard
  },
  head: {
    title: "메인페이지"
  },
  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    }
  },
  // component를 마운트 하기 전에 store에 비동기 작업실행
  fetch({ store, params }) {
    return store.dispatch("posts/loadHashtagPosts", {
      hashtag: encodeURIComponent(params.id),
      reset: true
    });
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
    }
  }
};
</script>

<style>
</style>