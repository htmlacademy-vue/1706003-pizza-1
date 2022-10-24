<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="setAddressInfo"
  >
    <div class="address-form__header">
      <b>{{ title }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
            v-model="name"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            v-model="street"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model="building"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model="flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        v-if="!newAddress"
        @click="delAddressInfo"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
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
</style>
