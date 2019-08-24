<template>
  <v-container>
    <v-card>
      <v-form v-model="valid" @submit.prevent="onSubmitForm" ref="form">
        <v-container>
          <v-text-field label="이메일" type="email" required v-model="email" :rules="emailRules" />
          <v-text-field
            label="비밀번호"
            type="password"
            required
            v-model="password"
            :rules="passwordRules"
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "이메일은 필수입니다.",
        v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."
      ],
      passwordRules: [v => !!v || "비밀번호는 필수입니다."]
    };
  },
  methods: {
    onSubmitForm() {
      this.$refs.form.validate();
      if (this.valid) {
        alert("로그인 시도!");
      } else {
        alert("폼이 유효하지 않습니다.");
      }
    }
  }
};
</script>

<style>
</style>