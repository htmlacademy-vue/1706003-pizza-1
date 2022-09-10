<template>
  <div class="content__constructor">
    <div class="pizza" :class="pizzaFoundationClass">
      <AppDrop class="pizza__wrapper" @drop="addIngredient">
        <div
          v-for="ingredient in filteredIngredients"
          :key="ingredient.ingredientId"
          class="pizza__filling"
          :class="ingredientClass(ingredient.ingredientId)"
        ></div>
      </AppDrop>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapState("Builder", {
      sauceId: "sauceId",
      doughId: "doughId",
      sizeId: "sizeId",
      ingredientsQty: "ingredients",
    }),
    ...mapGetters([
      "normolizedDought",
      "normolizedSauces",
      "normolizedIngredients",
    ]),
    pizzaFoundationClass() {
      const doughClassModifier = {
        light: "small",
        large: "big",
      };
      const dough = this.normolizedDought
        .slice()
        .find((dough) => dough.id === this.doughId);
      const sauce = this.normolizedSauces
        .slice()
        .find((sauce) => sauce.id === this.sauceId);
      return `pizza--foundation--${doughClassModifier[dough.value]}-${
        sauce.value
      }`;
    },
    filteredIngredients() {
      return this.ingredientsQty
        .slice()
        .filter((ingredient) => ingredient.quantity > 0);
    },
  },
  methods: {
    ...mapActions("Builder", ["changeIngredientQty"]),
    ingredientClass(id) {
      const classObj = {};
      const ingredients = this.normolizedIngredients.slice();
      const ingredient = ingredients.find((ingredient) => ingredient.id === id);
      const quantity = this.ingredientsQty
        .slice()
        .find((ingredient) => ingredient.ingredientId === id).quantity;
      classObj[`pizza__filling--${ingredient.value}`] = true;
      classObj["pizza__filling--second"] = quantity == 2;
      classObj["pizza__filling--third"] = quantity > 2;
      return classObj;
    },
    addIngredient(ingredient) {
      const qty = this.ingredientsQty
        .slice()
        .find((element) => element.ingredientId === ingredient.id).quantity;

      if (qty <= 2) {
        this.changeIngredientQty({ id: ingredient.id, quantity: qty + 1 });
      }
    },
  },
};
</script>

<style lang="scss">
.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
