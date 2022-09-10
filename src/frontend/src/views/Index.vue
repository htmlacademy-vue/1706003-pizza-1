<template>
  <main class="content">
    <div>
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <form class="content__pizza" @submit.prevent>
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="pizza.name"
              required
            />
          </label>

          <BuilderPizzaView @addIngredient="addIngredient" />

          <BuilderPriceCounter
            :price="finalPrice"
            :disabled="disabledGetPrice"
            @addToOrder="addToOrder"
          />
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPriceCounter,
    BuilderPizzaView,
  },
  data() {
    return {
      pizza: {
        name: "",
      },
    };
  },
  methods: {
    ...mapActions("Builder", ["changeName", "resetStateModule"]),
    ...mapActions("Cart", ["addPizzaToCart"]),
    addIngredient(id) {
      const ingredient = this.pizza.ingredients.find(
        (ingredient) => ingredient.id === id
      );
      if (ingredient.total <= 2) {
        ingredient.total += 1;
      }
    },
    addToOrder() {
      this.changeName({ name: this.pizza.name });
      this.addPizzaToCart();
      this.resetBuilder();
    },
    resetBuilder() {
      this.resetStateModule();
      this.pizza.name = "";
    },
  },
  computed: {
    ...mapState("Builder", {
      sauceId: "sauceId",
      doughId: "doughId",
      sizeId: "sizeId",
      ingredientsQty: "ingredients",
    }),
    ...mapState(["dough", "sauces", "ingredients", "sizes"]),
    multiplier() {
      return this.sizes.slice().find((size) => size.id === this.sizeId)
        .multiplier;
    },
    disabledGetPrice() {
      return (
        !this.pizza.name ||
        !this.ingredientsQty.slice().filter((ingredient) => ingredient.quantity)
          .length
      );
    },
    standartPrice() {
      let mainCost;
      let addedCost;
      let ingredientsPrice = {};
      const sauce = this.sauces
        .slice()
        .find((sauce) => sauce.id === this.sauceId);
      const dough = this.dough
        .slice()
        .find((dough) => dough.id === this.doughId);

      mainCost = dough.price + sauce.price;

      this.ingredients
        .slice()
        .forEach(
          (ingredient) =>
            (ingredientsPrice[ingredient.id] = { price: ingredient.price })
        );
      this.ingredientsQty
        .slice()
        .forEach(
          (ingredient) =>
            (ingredientsPrice[ingredient.ingredientId].quantity =
              ingredient.quantity)
        );

      addedCost = Object.values(ingredientsPrice).reduce(
        (cost, ingredient) => ingredient.price * ingredient.quantity + cost,
        0
      );

      return mainCost + addedCost;
    },
    finalPrice() {
      return this.standartPrice * this.multiplier;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/content.scss";
</style>
