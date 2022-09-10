<template>
  <ul class="cart-list">
    <CartListItem
      v-for="pizza in pizzas"
      :key="pizza.id"
      :name="pizza.name"
      :doughId="pizza.doughId"
      :sauceId="pizza.sauceId"
      :sizeId="pizza.sizeId"
      :ingredientsId="pizza.ingredients"
      :quantity="pizza.quantity"
      @changeQty="(qty) => changePizzaQty({ id: pizza.id, qty })"
    />
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";

import CartListItem from "@/modules/cart/components/CartListItem.vue";

export default {
  name: "CartList",
  components: { CartListItem },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", ["changePizzaQty"]),
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  @include clear-list;

  padding: 15px 0;
}
</style>
