<template>
  <div>
    <v-container>
      <v-card style="margin-bottom : 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field label="닉네임" required v-model="nickname" :rules="nicknameRules" />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom : 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn
            @click="loadMoreFollowing"
            v-if="hasMoreFollowing"
            dark
            color="blue"
            style="width:100%"
          >더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom : 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn
            @click="loadMoreFollower"
            v-if="hasMoreFollower"
            dark
            color="blue"
            style="width:100%"
          >더보기</v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";

export default {
  data() {
    return {
      valid: false,
      nickname: "",
      nicknameRules: [v => !!v || "닉네임을 입력하세요."]
    };
  },
  head: {
    title: "프로필"
  },
  components: {
    FollowList
  },
  fetch({ store }) {
    store.dispatch("users/loadFollowings");
    return store.dispatch("users/loadFollowers");
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname
      });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", {
        id: id
      });
    },
    removeFollowing(id) {
      this.$store.dispatch("users/removeFollowing", {
        id: id
      });
    },
    loadMoreFollowing() {
      this.$store.dispatch("users/loadFollowings");
    },
    loadMoreFollower() {
      this.$store.dispatch("users/loadFollowers");
    }
  },
  computed: {
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    }
  },
  middleware: "authenticated"
};
</script>

<style>
</style>