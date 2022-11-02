<template>
  <div class="modal">
    <div class="sign-form">
      <AppClose
        :modifier="'white'"
        @click="closeAuthModal"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </AppClose>
      <div class="sign-form__title">
        <AppTitle :modifier="['small']">
          Авторизуйтесь на сайте
        </AppTitle>
      </div>
      <form @submit.prevent="login">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input
              ref="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="example@mail.ru"
            >
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              v-model="password"
              type="password"
              name="pass"
              placeholder="***********"
            >
          </label>
        </div>
        <AppButton
          type="submit"
          class="button"
        >
          Авторизоваться
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";

import AppButton from "@/common/components/AppButton.vue";
import AppClose from "@/common/components/AppClose.vue";
import AppTitle from "@/common/components/AppTitle.vue";

export default {
  name: "Login",
  components: { AppButton, AppClose, AppTitle },
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

  .button {
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

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
