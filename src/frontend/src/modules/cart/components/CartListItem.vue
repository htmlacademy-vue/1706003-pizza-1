<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
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
          <li>{{ size.name }}, {{ dough.name }} тесто</li>
          <li>Соус: {{ sauce.name }}</li>
          <li>Начинка: {{ ingredientsNames }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      :min="0"
      :counter="quantity"
      :buttonColor="'orange'"
      @changeCounter="changeQty"
      class="cart-list__counter"
    />

    <div class="cart-list__price">
      <b>{{ formattedFinalPrice }}</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "CartListItem",
  components: { ItemCounter },
  props: {
    name: {
      type: String,
      required: true,
    },
    doughId: {
      type: Number,
      requred: true,
    },
    sauceId: {
      type: Number,
      requred: true,
    },
    sizeId: {
      type: Number,
      requred: true,
    },
    ingredientsId: {
      type: Array,
      required: true,
    },
    quantity: {
      type: Number,
      requred: true,
    },
  },
  computed: {
    ...mapGetters([
      "normolizedDought",
      "normolizedIngredients",
      "normolizedSauces",
      "normolizedSizes",
    ]),
    dough() {
      return this.normolizedDought.find((dough) => dough.id === this.doughId);
    },
    sauce() {
      return this.normolizedSauces.find((sauce) => sauce.id === this.sauceId);
    },
    size() {
      return this.normolizedSizes.find((size) => size.id === this.sizeId);
    },
    ingredients() {
      let ingredientsObj = {};
      this.normolizedIngredients.forEach(
        (ingredient) => (ingredientsObj[ingredient.id] = { ...ingredient })
      );
      this.ingredientsId.forEach(
        (ingredient) =>
          (ingredientsObj[ingredient.ingredientId].quantity =
            ingredient.quantity)
      );
      return Object.values(ingredientsObj);
    },
    multiplier() {
      return this.size.multiplier;
    },
    ingredientsNames() {
      const names = this.ingredients
        .filter((ingredient) => ingredient.quantity)
        .map((ingredient) => ingredient.name);
      return names.join(", ").toLowerCase();
    },
    standartPrice() {
      const mainCost = this.dough.price + this.sauce.price;
      const addedCost = this.ingredients.reduce(
        (cost, ingredient) => ingredient.price * ingredient.quantity + cost,
        0
      );
      return mainCost + addedCost;
    },
    finalPrice() {
      return this.standartPrice * this.multiplier;
    },
    formattedFinalPrice() {
      return formatCurrency(this.finalPrice);
    },
  },
  methods: {
    changeQty(qty) {
      this.$emit("changeQty", qty);
    },
    changePizza() {
      this.$emit("changePizza");
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
