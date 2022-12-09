<template>
  <div class="result">
    <p
      class="text"
      data-test="pizza-price"
    >
      Итого: {{ formattedPrice }}
    </p>
    <AppButton
      class="button"
      :disabled="disabled"
      data-test="btn-add-to-order"
      @click="addToOrder"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { formatCurrency } from "@/common/helpers.js";

import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "BuilderPriceCounter",
  components: { AppButton },
  props: {
    price: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedPrice() {
      return formatCurrency(this.price);
    },
  },
  methods: {
    addToOrder() {
      this.$emit("addToOrder");
    },
  },
};
</script>

<style lang="scss">
.result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  .text {
    @include b-s24-h28;

    margin: 0;
  }

  .button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
