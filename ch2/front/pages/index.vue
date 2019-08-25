<template>
  <v-container>
    <post-form v-if="me" />
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
import PostForm from "~/components/PostForm";

export default {
  data() {
    return {
      name: "Nuxt.js"
    };
  },
  components: {
    PostCard,
    PostForm
  },
  head: {
    title: "메인페이지"
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  }
};
</script>

<style>
</style>