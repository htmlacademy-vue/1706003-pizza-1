<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="сomment" class="select" @change="changeDeliveryMethod">
          <option
            v-for="method in deliveryMethods"
            :key="method.id"
            :value="method.id"
            :selected="method.id === selectedDeliveryMethod.id"
          >
            {{ method.name }}
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
              :value="selectedDeliveryMethod.street || street"
              :disabled="selectedDeliveryMethod.street"
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
              :value="selectedDeliveryMethod.building || building"
              :disabled="selectedDeliveryMethod.building"
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
              :value="selectedDeliveryMethod.flat || flat"
              :disabled="selectedDeliveryMethod.flat"
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
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    flat: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeDeliveryMethod(event) {
      const selectedDeliveryMethod = this.deliveryMethods.find(
        (method) => method.id === Number(event.target.value)
      );
      this.$emit("update:selectedDeliveryMethod", selectedDeliveryMethod);
    },
    changePhone(event) {
      this.$emit("update:phone", event.target.value);
    },
    changeStreet(event) {
      this.$emit("update:street", event.target.value);
    },
    changeBuilding(event) {
      this.$emit("update:building", event.target.value);
    },
    changeFlat(event) {
      this.$emit("update:flat", event.target.value);
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
