<template>
  <div class="content__result">
    <p>Итого: {{ formattedPrice }}</p>
    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="addToOrder"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "BuilderPriceCounter",
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
  methods: {
    addToOrder() {
      this.$emit("addToOrder");
    },
  },
  computed: {
    formattedPrice() {
      return formatCurrency(this.price);
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
