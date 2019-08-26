export const state = () => ({
  // 로그인 더미
  me: null,
  followerList: [],
  followingList: []
});

// 동기작업
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  }
};

// 비동기작업
export const actions = {
  signUp({ commit }, payload) {
    commit("setMe", payload);
  },
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }) {
    commit("setMe", null);
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  }
};
