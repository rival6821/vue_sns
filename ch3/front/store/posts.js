import Vue from "vue";

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: []
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  editPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].content = payload.content;
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    Vue.set(state.mainPosts[index], "Comments", payload.data);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === 10;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
  likePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Likers.push({
      id: payload.userId
    });
  },
  unlikePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const userIndex = state.mainPosts[index].Likers.findIndex(
      v => v.id === payload.userId
    );
    state.mainPosts[index].Likers.splice(userIndex, 1);
  }
};

export const actions = {
  //포스트 등록
  add({ commit, state }, payload) {
    this.$axios
      .post(
        "/post",
        {
          content: payload.content,
          image: state.imagePaths
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("addMainPost", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 포스트 삭제
  remove({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        withCredentials: true
      })
      .then(() => {
        commit("removeMainPost", payload);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 포스트 수정
  edit({ commit }, payload) {
    this.$axios
      .patch(
        "/post/edit",
        {
          postId: payload.postId,
          content: payload.content
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("editPost", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 댓글추가하기
  addComment({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/comment`,
        {
          content: payload.content
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("addComment", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 댓글가져오기
  loadComments({ commit }, payload) {
    this.$axios
      .get(`/post/${payload.postId}/comments`)
      .then(res => {
        commit("loadComments", { postId: payload.postId, data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 포스트 불러오기
  async loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      try {
        const res = await this.$axios.get(
          `/posts?offset=${state.mainPosts.length}&limit=10`
        );
        commit("loadPosts", res.data);
      } catch (err) {
        console.error(err);
      }
    }
  },
  // 이미지 업로드
  uploadImages({ commit }, payload) {
    this.$axios
      .post("/post/images", payload, {
        withCredentials: true
      })
      .then(res => {
        commit("concatImagePaths", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  //리트윗
  retweet({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/retweet`,
        {},
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("addMainPost", res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  //좋아요
  likePost({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/like`,
        {},
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("likePost", {
          userId: res.data.userId,
          postId: payload.postId
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  //좋아요해제
  unlikePost({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}/like`, {
        withCredentials: true
      })
      .then(res => {
        commit("unlikePost", {
          userId: res.data.userId,
          postId: payload.postId
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};
