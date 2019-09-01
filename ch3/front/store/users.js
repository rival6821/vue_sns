export const state = () => ({
  // 로그인 더미
  me: null,
  followerList: [],
  followingList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true
});

const totalFollowers = 8;
const totalFollowings = 8;
const limit = 3;

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
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        nickname: Math.round(Math.random() * 1000)
      }));
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  },
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        nickname: Math.round(Math.random() * 1000)
      }));
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
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
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings");
    }
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers");
    }
  }
};