<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">Home</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashTag">
            <div :style="{ display: 'flex', alignItems: 'center', height:'100%' }">
              <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" v-model="hashtag" />
            </div>
          </v-form>
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      hashtag: ""
    };
  },
  computed: {},
  methods: {
    onSearchHashTag() {
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`
      });
      this.hashtag = "";
    }
  }
};
</script>

<style></style>
