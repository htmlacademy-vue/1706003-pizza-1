import { pizzaPrice } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    pizzas: [],
    misc: [],
  },
  getters: {
    pizzasCost(state, getters, rootState, rootGetters) {
      return state.pizzas.reduce(
        (cost, pizza) =>
          pizzaPrice({ elId: pizza, elDescription: rootGetters }) *
            pizza.quantity +
          cost,
        0
      );
    },
    miscCost(state, getters, rootState) {
      return state.misc.reduce(
        (cost, element) =>
          rootState.misc.find(({ miscId }) => miscId === element.miscId).price *
            element.quantity +
          cost,
        0
      );
    },
    cost(_, getters) {
      return getters.pizzasCost + getters.miscCost;
    },
  },
  actions: {
    addPizzaToCart({ commit }, { pizza }) {
      commit(
        "ADD_ENTITY",
        {
          module: "Cart",
          entity: "pizzas",
          value: pizza,
        },
        { root: true }
      );
    },
    changePizzaQty({ commit, state }, { index, quantity }) {
      const pizza = {
        ...state.pizzas[index],
        quantity,
      };
      commit(
        "UPDATE_ENTITY",
        {
          module: "Cart",
          entity: "pizzas",
          value: pizza,
          id: null,
          idx: index,
        },
        { root: true }
      );
    },
    changeMiscQty({ commit }, { misc }) {
      commit(
        "UPDATE_ENTITY",
        {
          module: "Cart",
          entity: "misc",
          value: misc,
          nameId: "miscId",
          idx: null,
        },
        { root: true }
      );
    },
    deletePizzaFromCart({ commit }, { index }) {
      commit(
        "DELETE_ENTITY",
        {
          module: "Cart",
          entity: "pizzas",
          idx: index,
        },
        { root: true }
      );
    },
    resetCartState({ commit, rootState }) {
      commit(
        "SET_ENTITY",
        { module: "Cart", entity: "pizzas", value: [] },
        { root: true }
      );
      commit(
        "SET_ENTITY",
        {
          module: "Cart",
          entity: "misc",
          value: rootState.misc.map((misc) => ({
            miscId: misc.miscId,
            quantity: 0,
          })),
        },
        { root: true }
      );
    },
  },
};
