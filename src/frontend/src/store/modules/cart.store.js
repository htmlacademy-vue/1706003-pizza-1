import { uniqueId } from "lodash";

import misc from "@/static/misc.json";

const getDefaultState = () => {
  return {
    pizzas: [],
    misc: misc.map((product) => ({ ...product, quantity: 0 })),
  };
};

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    ADD_PIZZA_TO_CART(state, { pizza }) {
      state.pizzas.push(pizza);
    },
    CHANGE_QTY(state, { entity, id, qty }) {
      state[entity].find((element) => element.id === id).quantity = qty;
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    pizzasCost(state, getters, rootState, rootGetters) {
      const pizzaCost = (pizza) => {
        let mainCost;
        let addedCost;
        let ingredientsPrice = {};
        const sauce = rootGetters.normolizedSauces
          .slice()
          .find((sauce) => sauce.id === pizza.sauceId);
        const dough = rootGetters.normolizedDought
          .slice()
          .find((dough) => dough.id === pizza.doughId);
        const size = rootGetters.normolizedSizes
          .slice()
          .find((size) => size.id === pizza.sizeId);

        mainCost = dough.price + sauce.price;

        rootGetters.normolizedIngredients
          .slice()
          .forEach(
            (ingredient) =>
              (ingredientsPrice[ingredient.id] = { price: ingredient.price })
          );
        pizza.ingredients
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
        return (mainCost + addedCost) * size.multiplier;
      };

      return state.pizzas.reduce(
        (cost, pizza) => pizzaCost(pizza) * pizza.quantity + cost,
        0
      );
    },
    miscCost(state) {
      return state.misc.reduce(
        (cost, element) => element.price * element.quantity + cost,
        0
      );
    },
    cost(_, getters) {
      return getters.pizzasCost + getters.miscCost;
    },
  },
  actions: {
    addPizzaToCart({ commit, rootState }) {
      const pizza = {
        ...rootState.Builder,
        id: Number(uniqueId()),
        quantity: 1,
      };
      commit("ADD_PIZZA_TO_CART", { pizza });
    },
    changePizzaQty({ commit }, { id, qty }) {
      commit("CHANGE_QTY", { entity: "pizzas", id, qty });
    },
    changeMiscQty({ commit }, { id, qty }) {
      commit("CHANGE_QTY", { entity: "misc", id, qty });
    },
    resetStateModule({ commit }) {
      commit("RESET_STATE");
    },
  },
};
