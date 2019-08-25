// 함수여야함
export const state = () => ({
  mainPosts: []
});

// 일반객체에 함수가 들어감
export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  }
};

export const actions = {
  add({ commit }, payload) {
    commit("addMainPost", payload);
  }
};
