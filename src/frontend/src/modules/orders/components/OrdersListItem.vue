<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="name"
      />
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ size }}, на тонком тесте</li>
          <li>Соус: {{ sauce }}</li>
          <li>Начинка: {{ formatedIngredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ `${quantity}x${formatedPrice}` }}</p>
  </li>
</template>

<script>
import { mapState } from "vuex";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "OrdersListItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["sauces", "sizes", "ingredients"]),
    name() {
      return this.pizza.name;
    },
    quantity() {
      return this.pizza.quantity;
    },
    sauce() {
      return this.sauces
        .find((sauce) => sauce.id === this.pizza.sauceId)
        .name.toLowerCase();
    },
    size() {
      return this.sizes.find((size) => size.id === this.pizza.sizeId).name;
    },
    formatedIngredients() {
      const ingredientsName = [];
      const ingredients = this.pizza.ingredients.filter(
        (ingredient) => ingredient.quantity !== 0
      );
      ingredients.forEach((ingredient) =>
        ingredientsName.push(
          this.ingredients.find((item) => item.id === ingredient.ingredientId)
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
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
