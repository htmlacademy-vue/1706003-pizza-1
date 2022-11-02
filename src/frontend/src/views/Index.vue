<template>
  <main class="content">
    <div>
      <div class="content__wrapper">
        <AppTitle :modifier="['big']">
          Конструктор пиццы
        </AppTitle>
        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <form
          class="content__pizza"
          @submit.prevent
        >
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              required
            >
          </label>

          <BuilderPizzaView />

          <BuilderPriceCounter
            :price="price"
            :disabled="disabledGetPrice"
            @addToOrder="addToOrder"
          />
        </form>
      </div>
      <transition
        name="show"
        appear
      >
        <router-view />
      </transition>
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
import AppTitle from "@/common/components/AppTitle.vue";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPriceCounter,
    BuilderPizzaView,
    AppTitle,
  },
  data() {
    return {
      pizza: {
        name: "",
      },
    };
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
};
</script>

<style lang="scss" scoped>
.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>
