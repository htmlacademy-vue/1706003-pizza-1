<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="сomment" class="select" v-model="selectedAddress">
          <option v-for="adress in addresses" :key="adress.id" :value="adress">
            {{ adress.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          required
          v-model="phone"
        />
      </label>

      <div class="cart-form__address" v-if="selectedAddress.id !== 'default_0'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              required
              v-model="selectedAddress.street"
              :disabled="selectedAddress.id !== 'default_1'"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              required
              v-model="selectedAddress.building"
              :disabled="selectedAddress.id !== 'default_1'"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model="selectedAddress.flat"
              :disabled="selectedAddress.id !== 'default_1'"
            />
          </label>
        </div>
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
</style>
