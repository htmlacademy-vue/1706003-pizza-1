<template>
  <form
    class="sheet address-form address-form--opened"
    @submit.prevent="setAddressInfo"
  >
    <div class="address-form__header">
      <b data-test="address-header">{{ title }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            v-model="name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            data-test="input-address-name"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            data-test="input-address-street"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            data-test="input-address-building"
            required
          >
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            data-test="input-address-flat"
          >
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            data-test="input-address-comment"
          >
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton
        v-if="!newAddress"
        type="button"
        class="button"
        :modifier="['transparent']"
        data-test="btn-delete-address"
        @click="delAddressInfo"
      >
        Удалить
      </AppButton>
      <AppButton
        type="submit"
        class="button"
      >
        Сохранить
      </AppButton>
    </div>
  </form>
</template>

<script>
import AppButton from "@/common/components/AppButton.vue";

function initialState() {
  return {
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  };
}
export default {
  name: "ProfileAddressForm",
  components: { AppButton },
  props: {
    newAddress: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: false,
      default: () => ({
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      }),
    },
  },
  data() {
    return {
      name: this.address ? this.address.name : "",
      street: this.address ? this.address.street : "",
      building: this.address ? this.address.building : "",
      flat: this.address ? this.address.flat : "",
      comment: this.address ? this.address.comment : "",
    };
  },
  methods: {
    resetForm() {
      Object.assign(this.$data, initialState());
    },
    setAddressInfo(event) {
      this.$emit("setAddressInfo", {
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      });
      this.resetForm();
      event.target.reset();
    },
    delAddressInfo() {
      this.$emit("delAddressInfo");
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

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
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
