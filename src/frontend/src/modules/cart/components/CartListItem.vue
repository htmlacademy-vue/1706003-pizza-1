<template>
  <li class="cart-list__item">
    <AppProduct
      :name="name"
      :size="size.name"
      :dough="dough.name.toLowerCase()"
      :sauce="sauce.name"
      :ingredients="ingredientsNames"
      class="cart-list__product"
    />

    <ItemCounter
      :min="0"
      :counter="quantity"
      :button-color="'orange'"
      class="cart-list__counter"
      data-test="item-counter"
      @changeCounter="changeQty"
    />

    <div
      class="cart-list__price"
      data-test="pizza-item-price"
    >
      <b>{{ formattedFinalPrice }}</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        data-test="btn-change-pizza"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";
import AppProduct from "@/common/components/AppProduct.vue";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "CartListItem",
  components: { ItemCounter, AppProduct },
  props: {
    name: {
      type: String,
      required: true,
    },

    doughId: {
      type: Number,
      required: true,
    },

    sauceId: {
      type: Number,
      required: true,
    },

    sizeId: {
      type: Number,
      required: true,
    },

    ingredientsId: {
      type: Array,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
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
      return this.normolizedDought.find((dough) => dough.doughId === this.doughId);
    },

    sauce() {
      return this.normolizedSauces.find((sauce) => sauce.sauceId === this.sauceId);
    },

    size() {
      return this.normolizedSizes.find((size) => size.sizeId === this.sizeId);
    },

    ingredients() {
      return this.normolizedIngredients.map((ingredient) => ({
        ...ingredient,
        quantity: this.ingredientsId.find((id) => id.ingredientId === ingredient.ingredientId).quantity,
      }));
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
