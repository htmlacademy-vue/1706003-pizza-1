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

          <BuilderPizzaView />

          <BuilderPriceCounter
            :price="price"
            :disabled="disabledGetPrice"
            @addToOrder="addToOrder"
          />
        </form>
      </div>
      <router-view />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

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
    ...mapActions("Builder", ["changeBuilderEntity", "resetBuilderState"]),
    ...mapActions("Cart", ["addPizzaToCart", "replacePizzaInCart"]),
    addToOrder() {
      this.changeBuilderEntity({
        entity: "name",
        value: this.pizza.name,
      });
      this.addPizzaToCart({
        pizza: {
          name: this.name,
          sauceId: this.sauceId,
          doughId: this.doughId,
          sizeId: this.sizeId,
          quantity: this.quantity,
          ingredients: this.ingredients,
        },
      });
      this.resetBuilder();
    },
    resetBuilder() {
      this.resetBuilderState();
      this.pizza.name = "";
    },
  },
  computed: {
    ...mapState("Builder", [
      "ingredients",
      "name",
      "sauceId",
      "doughId",
      "sizeId",
      "quantity",
    ]),
    ...mapGetters("Builder", ["price"]),
    disabledGetPrice() {
      return (
        !this.pizza.name ||
        !this.ingredients.filter((ingredient) => ingredient.quantity).length
      );
    },
  },
  mounted() {
    this.pizza.name = this.name;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/content.scss";
</style>
