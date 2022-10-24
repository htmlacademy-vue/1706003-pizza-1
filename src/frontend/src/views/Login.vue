<template>
  <div class="modal">
    <div class="sign-form">
      <div class="close close--white" @click="closeAuthModal">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </div>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form @submit.prevent="login">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.ru"
              ref="email"
              v-model="email"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              type="password"
              name="pass"
              placeholder="***********"
              v-model="password"
            />
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";

export default {
  name: "Login",
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    closeAuthModal() {
      this.$router.go(-1);
    },
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });

      await this.closeAuthModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}
</style>
