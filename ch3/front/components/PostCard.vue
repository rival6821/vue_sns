<template>
  <div style="margin-bottom:20px;">
    <v-card>
      <post-images :images="post.Images || []" />
      <v-card-title>
        <h3>
          <nuxt-link :to="'/user/'+post.User.id">{{post.User.nickname}}</nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text v-if="!editPost">
        <div>{{post.content}}</div>
      </v-card-text>
      <v-form v-else>
        <v-container>
          <v-text-field v-model="editInput" ref="editInputField" />
          <v-btn @click="onEditPost">수정</v-btn>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{heartIcon}}</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover v-if="!editPost">
          <template v-slot:activator="{on}">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background : white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn dark color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <comment-form :postId="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{c.User.nickname[0]}}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{c.User.nickname}}</v-list-item-title>
            <v-list-item-subtitle>{{c.content}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
import CommentForm from "~/components/CommentForm";
import PostImages from "~/components/PostImages";
export default {
  components: {
    CommentForm,
    PostImages
  },
  data() {
    return {
      commentOpened: false,
      editPost: false,
      editInput: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      const me = this.$store.state.users.me;
      return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch("posts/remove", {
        postId: this.post.id
      });
    },
    // 포스트 수정
    onEditPost() {
      // console.log(this.editPost);
      if (this.editPost) {
        // 수정로직
        if (this.editInput != "") {
          this.$store.dispatch("posts/edit", {
            postId: this.post.id,
            content: this.editInput
          });
        } else {
          // console.log(this.editInput);
          alert("게시글 내용을 입력해주세요");
          return;
        }
      } else {
        // 수정창 열기
        this.editInput = this.post.content;
      }
      this.editPost = !this.editPost;
      // console.log(this.editPost);
    },
    onToggleComment() {
      if (!this.commentOpened) {
        this.$store.dispatch("posts/loadComments", {
          postId: this.post.id
        });
      }
      this.commentOpened = !this.commentOpened;
    },
    // 리트윗버튼
    onRetweet() {
      if (!this.me) {
        return alert("로그인이 필요합니다.");
      }
      this.$store.dispatch("posts/retweet", {
        postId: this.post.id
      });
    },
    // 좋아요 버튼 누름
    onClickHeart() {
      if (!this.me) {
        return alert("로그인이 필요합니다.");
      }
      if (this.liked) {
        return this.$store.dispatch("posts/unlikePost", {
          postId: this.post.id
        });
      }
      return this.$store.dispatch("posts/likePost", {
        postId: this.post.id
      });
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
