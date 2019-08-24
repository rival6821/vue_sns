export const state = () => ({
  hello: 'vuex',
});

export const muitations = {
  bye(state) {
    state.hello = 'goodbye';
  }
}