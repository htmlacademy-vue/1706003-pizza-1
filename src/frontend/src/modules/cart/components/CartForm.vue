<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="сomment"
          class="select"
          :selected="selectedDeliveryMethod"
          @change="changeDeliveryMethods"
        >
          <option
            v-for="method in deliveryMethods"
            :key="method.id"
            :value="method.id"
          >
            {{ method.text }}
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
          @input="changePhone"
          :value="phone"
        />
      </label>

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              required
              @input="changeStreet"
              :value="street"
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
              @input="changeBuilding"
              :value="building"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              @input="changeFlat"
              :value="flat"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",
  props: {
    deliveryMethods: {
      type: Array,
      required: true,
    },
    selectedDeliveryMethod: {
      type: Number,
      requred: true,
    },
    phone: {
      type: String,
      requred: true,
    },
    street: {
      type: String,
      requred: true,
    },
    building: {
      type: String,
      requred: true,
    },
    flat: {
      type: String,
      requred: true,
    },
  },
  methods: {
    changeDeliveryMethods(event) {
      this.$emit("changeDeliveryMethods", Number(event.target.value));
    },
    changePhone(event) {
      this.$emit("changePhone", event.target.value);
    },
    changeStreet(event) {
      this.$emit("changeStreet", event.target.value);
    },
    changeBuilding(event) {
      this.$emit("changeBuilding", event.target.value);
    },
    changeFlat(event) {
      this.$emit("changeFlat", event.target.value);
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

  span {
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
