<template>
  <div class="constructor">
    <div
      class="pizza"
      :class="pizzaFoundationClass"
    >
      <AppDrop
        class="pizza__wrapper"
        @drop="addIngredient"
      >
        <transition-group name="ingredients">
          <div
            v-for="ingredient in filteredIngredients"
            :key="ingredient.ingredientId"
            class="pizza__filling"
            :class="ingredientClass(ingredient.ingredientId)"
          />
        </transition-group>
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
      const dough = this.normolizedDought.find(
        (dough) => dough.doughId === this.doughId
      );
      const sauce = this.normolizedSauces.find(
        (sauce) => sauce.sauceId === this.sauceId
      );
      return `pizza--foundation--${doughClassModifier[dough.value]}-${
        sauce.value
      }`;
    },
    filteredIngredients() {
      return this.ingredientsQty.filter(
        (ingredient) => ingredient.quantity > 0
      );
    },
  },
  methods: {
    ...mapActions("Builder", ["changeIngredientQty"]),
    ingredientClass(id) {
      const classObj = {};
      const ingredient = this.normolizedIngredients.find(
        (ingredient) => ingredient.ingredientId === id
      );
      const quantity = this.ingredientsQty.find(
        (ingredient) => ingredient.ingredientId === id
      ).quantity;
      classObj[`pizza__filling--${ingredient.value}`] = true;
      classObj["pizza__filling--second"] = quantity == 2;
      classObj["pizza__filling--third"] = quantity > 2;
      return classObj;
    },
    addIngredient(ingredient) {
      const qty = this.ingredientsQty.find(
        (element) => element.ingredientId === ingredient.ingredientId
      ).quantity;

      if (qty <= 2) {
        this.changeIngredientQty({
          ingredientId: ingredient.ingredientId,
          quantity: qty + 1,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.constructor {
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
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all .5s ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
