import pizza from "@/static/pizza.json";

const getDefaultState = () => {
  return {
    name: "",
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    ingredients: pizza.ingredients.map((ingredient) => ({
      ingredientId: ingredient.id,
      quantity: 0,
    })),
  };
};

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    CHANGE_ID(state, { entity, id }) {
      state[entity] = id;
    },
    CHANGE_NAME(state, { name }) {
      state.name = name;
    },
    CHANGE_INGREDIENT_QTY(state, { id, quantity }) {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient.ingredientId === id
      );
      ingredient.quantity = quantity;
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    changeSauceId({ commit }, { id }) {
      commit("CHANGE_ID", { entity: "sauceId", id });
    },
    changeDoughId({ commit }, { id }) {
      commit("CHANGE_ID", { entity: "doughId", id });
    },
    changeSizeId({ commit }, { id }) {
      commit("CHANGE_ID", { entity: "sizeId", id });
    },
    changeIngredientQty({ commit }, { id, quantity }) {
      commit("CHANGE_INGREDIENT_QTY", { id, quantity });
    },
    changeName({ commit }, { name }) {
      commit("CHANGE_NAME", { name });
    },
    resetStateModule({ commit }) {
      commit("RESET_STATE");
    },
  },
};
