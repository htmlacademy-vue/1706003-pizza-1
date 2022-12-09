<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        v-model="selectedAddress"
        name="сomment"
        class="select"
      >
        <option
          v-for="adress in addresses"
          :key="adress.id"
          :value="adress"
        >
          {{ adress.name }}
        </option>
      </select>
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
        v-model="phone"
        type="tel"
        name="tel"
        placeholder="+7 999-999-99-99"
        data-test="cart-phone"
        required
      >
    </label>

    <div
      v-if="selectedAddress.id !== 'default_0'"
      data-test="address-form"
      class="cart-form__address"
    >
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="selectedAddress.street"
            type="text"
            name="street"
            data-test="cart-street"
            required
            :disabled="selectedAddress.id !== 'default_1'"
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="selectedAddress.building"
            type="text"
            name="house"
            data-test="cart-building"
            required
            :disabled="selectedAddress.id !== 'default_1'"
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="selectedAddress.flat"
            type="text"
            name="apartment"
            data-test="cart-flat"
            :disabled="selectedAddress.id !== 'default_1'"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import pick from "lodash/pick";

const defautltAdresses = [
  {
    id: "default_0",
    name: "Получу сам",
  },
  {
    id: "default_1",
    name: "Новый адрес",
    street: "",
    building: "",
    flat: "",
    comment: "",
  },
];

export default {
  name: "CartForm",
  data() {
    return {
      phone: "",
      selectedAddress: defautltAdresses[0],
    };
  },
  computed: {
    ...mapState("Auth", { userAdresses: "addresses" }),
    addresses() {
      return [...defautltAdresses, ...this.userAdresses];
    },
  },
  methods: {
    getContactInfo() {
      let address = null;
      const userId = this.$store.state.Auth.user?.id || null;

      if (this.selectedAddress.id === defautltAdresses[1].id) {
        address = pick(this.selectedAddress, [
          "street",
          "building",
          "flat",
          "comment",
        ]);
      }
      if (
        this.selectedAddress.id !== defautltAdresses[0].id &&
        this.selectedAddress.id !== defautltAdresses[1].id
      ) {
        address = pick(this.selectedAddress, ["id"]);
      }

      return {
        userId,
        address,
        phone: this.phone,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  .cart-form__label {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
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
