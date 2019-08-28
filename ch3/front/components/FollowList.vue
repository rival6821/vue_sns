<template>
  <v-list>
    <ul>
      <li v-for="user in users" :key="user.key">
        <span>{{user.nickname}}</span>
        <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
      </li>
    </ul>
  </v-list>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>