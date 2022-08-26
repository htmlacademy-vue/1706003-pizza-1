<template>
  <main class="content">
    <div>
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :doughArray="doughArray"
          :curentDough="this.pizza.dough"
          @changeDought="changeDought"
        />

        <BuilderSizeSelector
          :sizesArray="sizesArray"
          :curentSize="this.pizza.size"
          @changeSize="changeSize"
        />

        <BuilderIngredientsSelector
          :saucesArray="saucesArray"
          :curentSauce="pizza.sauce"
          :ingredientsArray="pizza.ingredients"
          @changeSauce="changeSauce"
          @chageAmountIngredient="chageAmountIngredient"
        />

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

          <BuilderPizzaView
            :dough="pizza.dough"
            :size="pizza.size"
            :sauce="pizza.sauce"
            :ingredients="pizza.ingredients"
            @addIngredient="addIngredient"
          />

          <BuilderPriceCounter
            :elementsWithPrice="[
              pizza.sauce,
              pizza.dough,
              ...pizza.ingredients,
            ]"
            :multiplier="pizza.size.multiplier"
            :disabled="disabledGetPrice"
            @getPrice="getPrice"
          />
        </form>
      </div>
    </div>
  </main>
</template>

<script>
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
  props: {
    doughArray: {
      type: Array,
      required: true,
    },
    ingredientsArray: {
      type: Array,
      required: true,
    },
    saucesArray: {
      type: Array,
      required: true,
    },
    sizesArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pizza: {
        size: this.sizesArray[0],
        sauce: this.saucesArray[0],
        dough: this.doughArray[0],
        ingredients: this.ingredientsArray.map((ingredient) => ({
          ...ingredient,
          total: 0,
        })),
        price: 0,
        name: "",
      },
    };
  },
  methods: {
    test(value) {
      console.log("TEST", value);
    },
    getPrice(price) {
      this.pizza.price = price;
    },
    changeDought(value) {
      this.pizza.dough = this.doughArray.find((dough) => dough.value === value);
    },
    changeSize(value) {
      this.pizza.size = this.sizesArray.find((size) => size.value === value);
    },
    changeSauce(value) {
      this.pizza.sauce = this.saucesArray.find(
        (sauce) => sauce.value === value
      );
    },
    chageAmountIngredient(value, counter) {
      const ingredient = this.pizza.ingredients.find(
        (ingredient) => ingredient.value === value
      );
      ingredient.total = counter;
    },
    addIngredient(id) {
      const ingredient = this.pizza.ingredients.find(
        (ingredient) => ingredient.id === id
      );
      if (ingredient.total <= 2) {
        ingredient.total += 1;
      }
    },
  },
  computed: {
    disabledGetPrice() {
      return (
        !this.pizza.name ||
        !this.pizza.ingredients.filter((ingredient) => ingredient.total).length
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/header.scss";
@import "~@/assets/scss/layout/content.scss";
</style>
