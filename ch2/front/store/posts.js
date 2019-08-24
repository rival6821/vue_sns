// 함수여야함
export const state = () => ({
  name: 'posts',
});

// 일반객체에 함수가 들어감
export const mutations = {
  bye(state) {
    state.name = 'goodbye posts';
  }
}