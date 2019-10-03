<template>
  <div>
    <post-images :images="post.Images || []" />
    <v-card-title>
      <h3>
        <nuxt-link :to="'/user/'+post.User.id">{{post.User.nickname}}</nuxt-link>
      </h3>
    </v-card-title>
    <v-card-text>
      <div>{{post.content}}</div>
    </v-card-text>
  </div>
</template>

<script>
import PostImages from "./PostImages";
export default {
  components: {
    PostImages
  },
  data() {
    return {};
  },
  props: {
    post: {
      type: Object
    }
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
