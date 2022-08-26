<template>
  <div class="content__result">
    <p>Итого: {{ formattedFinalPrice }}</p>
    <button type="button" class="button" :disabled="disabled" @click="getPrice">
      Готовьте!
    </button>
  </div>
</template>

<script>
import { formatCurrency } from "@/common/helpers.js";

import { has } from "lodash";

export default {
  name: "BuilderPriceCounter",
  props: {
    elementsWithPrice: {
      type: Array,
      required: true,
    },
    multiplier: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getPrice() {
      this.$emit("getPrice", this.finalPrice);
    },
  },
  computed: {
    standartPrice() {
      return this.elementsWithPrice.reduce(
        (totalPrice, element) =>
          has(element, "total")
            ? element.total * element.price + totalPrice
            : element.price + totalPrice,
        0
      );
    },
    finalPrice() {
      return this.standartPrice * this.multiplier;
    },
    formattedFinalPrice() {
      return formatCurrency(this.finalPrice);
    },
  },
};
</script>

<style lang="scss">
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
