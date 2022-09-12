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
      @changeQty="changePizzaQty({ id: pizza.id, qty: $event })"
      @changePizza="changePizza(pizza.id)"
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
    ...mapActions("Builder", ["getPizzaInOrder"]),
    changePizza(id) {
      this.getPizzaInOrder({ id });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  @include clear-list;

  padding: 15px 0;
}
</style>
