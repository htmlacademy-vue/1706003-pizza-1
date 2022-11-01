<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ title }}</b>
      <div class="address-form__edit">
        <button
          type="button"
          class="icon"
          @click="changeAddress"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p class="address-text">
      {{ address }}
    </p>
    <small class="address-comment">
      {{ comment }}
    </small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddress",
  props: {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeAddress() {
      this.$emit("changeAddress");
    },
  },
};
</script>

<style lang="scss" scoped>
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  margin-bottom: 16px;

  .address-text {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  .address-comment {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}
.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

</style>
