<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form @submit.prevent="onSubmitForm" v-model="valid" ref="form">
            <v-text-field v-model="email" label="이메일" type="email" required :rules="emailRules" />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              required
              :rules="passwordRules"
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              required
              :rules="passwordCheckRules"
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              required
              :rules="nicknameRules"
            />
            <v-checkbox
              v-model="terms"
              required
              label="약관에 동의합니다"
              :rules="[v=>!!v||'약관에 동의해야합니다.']"
            />
            <v-btn color="green" type="submit">가입하기</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        v => !!v || "이메일은 필수입니다.",
        v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."
      ],
      nicknameRules: [v => !!v || "닉네임은 필수입니다."],
      passwordRules: [v => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        v => !!v || "비밀번호 확인은 필수입니다.",
        v => v === this.password || "비밀번호를 동일하게 입력하세요."
      ]
    };
  },
  methods: {
    onSubmitForm() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store
          .dispatch("users/signUp", {
            nickname: this.nickname,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({
              path: "/"
            });
          })
          .catch(() => {
            alert("회원가입 실패");
          });
      } else {
        alert("폼이 유효하지 않습니다.");
      }
      //console.log(this.valid);
    }
  },
  head: {
    title: "회원가입"
  },
  middleware: "anonymous",
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  watch: {
    me(value, oldValue) {
      if (value) {
        this.$router.push({
          path: "/"
        });
      }
    }
  }
};
</script>

<style>
</style>