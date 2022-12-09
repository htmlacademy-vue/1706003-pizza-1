<template>
  <li class="order__item">
    <AppProduct
      :name="name"
      :size="size"
      :dough="doughName"
      :sauce="sauce"
      :ingredients="formatedIngredients"
    />

    <p
      class="order__price"
      data-test="order-item-price"
    >
      {{ `${quantity}x${formatedPrice}` }}
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

import { formatCurrency } from "@/common/helpers.js";

import AppProduct from "@/common/components/AppProduct.vue";


export default {
  name: "OrdersListItem",
  components: { AppProduct },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["sauces", "sizes", "ingredients", "dough"]),
    name() {
      return this.pizza.name;
    },
    quantity() {
      return this.pizza.quantity;
    },
    sauce() {
      return this.sauces
        .find((sauce) => sauce.sauceId === this.pizza.sauceId)
        .name.toLowerCase();
    },
    size() {
      return this.sizes.find((size) => size.sizeId === this.pizza.sizeId).name;
    },
    doughName() {
      return this.dough
        .find((dough) => dough.doughId === this.pizza.doughId)
        .name.toLowerCase();
    },
    formatedIngredients() {
      const ingredientsName = [];
      const ingredients = this.pizza.ingredients.filter(
        (ingredient) => ingredient.quantity !== 0
      );
      ingredients.forEach((ingredient) =>
        ingredientsName.push(
          this.ingredients.find((item) => item.ingredientId === ingredient.ingredientId)
            .name
        )
      );
      return ingredientsName.join(", ").toLowerCase();
    },
    formatedPrice() {
      return formatCurrency(this.pizza.cost / this.pizza.quantity);
    },
  },
};
</script>

<style lang="scss" scoped>
.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}
.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}
.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}
</style>
