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
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  editPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts[index].content = payload.content;
  },
  loadComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments = payload;
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  //포스트 등록
  add({ commit, state }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/post",
        {
          content: payload.content,
          imagePaths: state.imagePaths
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("addMainPost", res.data);
      })
      .catch(() => {});
  },
  // 포스트 삭제
  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },
  // 포스트 수정
  edit({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/post/edit",
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
      .catch(() => {});
  },
  // 댓글추가하기
  addComment({ commit }, payload) {
    this.$axios
      .post(
        `http://localhost:3085/post/${payload.postId}/comment`,
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
      .catch(() => {});
  },
  // 댓글가져오기
  loadComment({ commit }, payload) {
    this.$axios
      .get(`http://localhost:3085/post/${payload.postId}/comments`)
      .then(res => {
        commit("loadComment", res.data);
      })
      .catch(() => {});
  },
  // 포스트 불러오기
  loadPosts({ commit, state }) {
    if (state.hasMorePost) {
      this.$axios
        .get(
          `http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`
        )
        .then(res => {
          commit("loadPosts", res.data);
        })
        .catch(() => {});
    }
  },
  // 이미지 업로드
  uploadImages({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/post/images", payload, {
        withCredentials: true
      })
      .then(res => {
        commit("concatImagePaths", res.data);
      })
      .catch(() => {});
  }
};
