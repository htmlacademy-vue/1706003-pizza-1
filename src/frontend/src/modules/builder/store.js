import forIn from "lodash/forIn";
import { pizzaPrice } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    name: "",
    sauceId: null,
    doughId: null,
    sizeId: null,
    quantity: 1,
    ingredients: [],
  },
  actions: {
    changeBuilderEntity({ commit }, { entity, value }) {
      commit(
        "SET_ENTITY",
        {
          module: "Builder",
          entity: entity,
          value: value,
        },
        { root: true }
      );
    },
    changeIngredientQty({ commit }, { ingredientId, quantity }) {
      commit(
        "UPDATE_ENTITY",
        {
          module: "Builder",
          entity: "ingredients",
          value: { ingredientId, quantity },
          nameId: "ingredientId",
          idx: null,
        },
        { root: true }
      );
    },
    setBuilderState({ commit }, { state }) {
      forIn(state, (value, key) => {
        commit(
          "SET_ENTITY",
          {
            module: "Builder",
            entity: key,
            value: value,
          },
          { root: true }
        );
      });
    },
    resetBuilderState({ dispatch, rootState }) {
      const state = {
        name: "",
        sauceId: rootState.sauces[0].sauceId,
        doughId: rootState.dough[0].doughId,
        sizeId: rootState.sizes[0].sizeId,
        quantity: 1,
        ingredients: rootState.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          quantity: 0,
        })),
      };
      dispatch("setBuilderState", { state });
    },
  },
  getters: {
    price(state, getters, rootState, rootGetters) {
      return pizzaPrice({ elId: state, elDescription: rootGetters });
    },
  },
};
