<template>
  <div class="modal">
    <div class="popup">
      <AppClose
        data-test="btn-close"
        @click="closePopup"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </AppClose>
      <div class="popup__title">
        <h2 class="title">
          Спасибо за заказ
        </h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <AppButton
          class="button"
          data-test="btn-thx"
          @click="closePopup"
        >
          Отлично, я жду!
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppClose from "@/common/components/AppClose.vue";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "CartPopup",
  components: { AppClose, AppButton },
  methods: {
    closePopup() {
      this.$emit("closePopup");
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

.popup {
  @include pf_center-all;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}
.popup__title {
  text-align: center;

  font-size: 1.3em;
  .title {
    box-sizing: border-box;
    width: 100%;
    margin: 0;

    color: $black;
  }
}
.popup__button {
  display: flex;
  justify-content: center;
  .button {
    padding: 16px 32px;
  }
}
</style>
