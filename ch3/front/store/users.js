export const state = () => ({
  // 로그인 더미
  me: null,
  followerList: [
    {
      id: 1,
      nickname: "일훈"
    },
    {
      id: 2,
      nickname: "이일훈"
    },
    {
      id: 3,
      nickname: "아하하"
    }
  ],
  followingList: [
    {
      id: 1,
      nickname: "일훈"
    },
    {
      id: 2,
      nickname: "이일훈"
    },
    {
      id: 3,
      nickname: "아하하"
    }
  ]
});

// 동기작업
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollowing(state, payload) {
    state.followerList.push(payload);
  },
  addFollower(state, payload) {
    state.followingList.push(payload);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
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
  },
  addFollowing({ commit }, payload) {
    commit("addFollowing", payload);
  },
  addFollower({ commit }, payload) {
    commit("addFollower", payload);
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload);
  }
};
