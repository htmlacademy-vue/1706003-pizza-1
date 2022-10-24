<template>
  <ul class="cart-list">
    <CartListItem
      v-for="(pizza, index) in pizzas"
      :key="index"
      :name="pizza.name"
      :doughId="pizza.doughId"
      :sauceId="pizza.sauceId"
      :sizeId="pizza.sizeId"
      :ingredientsId="pizza.ingredients"
      :quantity="pizza.quantity"
      @changeQty="changePizzaQty({ index, quantity: $event })"
      @changePizza="changePizza(index)"
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
    ...mapActions("Cart", ["changePizzaQty", "deletePizzaFromCart"]),
    ...mapActions("Builder", ["setBuilderState"]),
    changePizza(index) {
      const pizza = this.pizzas[index];
      this.setBuilderState({ state: pizza });
      this.deletePizzaFromCart({ index });
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
