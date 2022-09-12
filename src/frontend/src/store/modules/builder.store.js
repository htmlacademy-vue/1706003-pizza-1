import pizza from "@/static/pizza.json";

const getDefaultState = () => {
  return {
    id: "",
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
    CHANGE_ELEMENT_BY_ID(state, { entity, id }) {
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
    GET_PIZZA(state, { pizza }) {
      state.id = pizza.id;
      state.name = pizza.name;
      state.sauceId = pizza.sauceId;
      state.doughId = pizza.doughId;
      state.sizeId = pizza.sizeId;
      state.ingredients = pizza.ingredients;
    },
  },
  actions: {
    changeSauceId({ commit }, { id }) {
      commit("CHANGE_ELEMENT_BY_ID", { entity: "sauceId", id });
    },
    changeDoughId({ commit }, { id }) {
      commit("CHANGE_ELEMENT_BY_ID", { entity: "doughId", id });
    },
    changeSizeId({ commit }, { id }) {
      commit("CHANGE_ELEMENT_BY_ID", { entity: "sizeId", id });
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
    getPizzaInOrder({ commit, rootState }, { id }) {
      const pizza = rootState["Cart"].pizzas.find((pizza) => pizza.id === id);
      commit("GET_PIZZA", { pizza });
    },
  },
  getters: {
    pizzaPrice(state, getters, rootState, rootGetters) {
      let mainCost;
      let addedCost;
      let ingredientsPrice = {};
      const sauce = rootGetters.normolizedSauces.find(
        (sauce) => sauce.id === state.sauceId
      );
      const dough = rootGetters.normolizedDought.find(
        (dough) => dough.id === state.doughId
      );
      const size = rootGetters.normolizedSizes.find(
        (size) => size.id === state.sizeId
      );

      mainCost = dough.price + sauce.price;

      rootGetters.normolizedIngredients.forEach(
        (ingredient) =>
          (ingredientsPrice[ingredient.id] = { price: ingredient.price })
      );
      state.ingredients.forEach(
        (ingredient) =>
          (ingredientsPrice[ingredient.ingredientId].quantity =
            ingredient.quantity)
      );

      addedCost = Object.values(ingredientsPrice).reduce(
        (cost, ingredient) => ingredient.price * ingredient.quantity + cost,
        0
      );
      return (mainCost + addedCost) * size.multiplier;
    },
  },
};
