<template>
  <v-container>
    <div>
      <post-card />
      <post-card />
      <post-card />
      <post-card />
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
  }
};
</script>

<style>
</style>