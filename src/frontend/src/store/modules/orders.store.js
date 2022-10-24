import { pizzaPrice } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    formattedOrders(state, getters, rootState, rootGetters) {
      return state.orders
        .map((order) => ({
          ...order,
          orderPizzas: order.orderPizzas.map((pizza) => ({
            ...pizza,
            cost:
              pizzaPrice({ elId: pizza, elDescription: rootGetters }) *
              pizza.quantity,
          })),
          orderMisc: order.orderMisc.map((misc) => ({
            ...misc,
            cost:
              rootState.misc.find((item) => item.id === misc.miscId).price *
              misc.quantity,
          })),
        }))
        .map((order) => ({
          ...order,
          cost:
            order.orderPizzas.reduce((total, pizza) => total + pizza.cost, 0) +
            order.orderMisc.reduce((total, misc) => total + misc.cost, 0),
        }));
    },
  },
  actions: {
    async getOrders({ commit }) {
      const orders = await this.$api.orders.query();
      commit(
        "SET_ENTITY",
        {
          module: "Orders",
          entity: "orders",
          value: orders,
        },
        { root: true }
      );
    },
    async setOrder({ dispatch }, { order }) {
      await this.$api.orders.post(order);
      await dispatch("getOrders");
    },
    async deleteOrder({ dispatch }, { id }) {
      await this.$api.orders.delete(id);
      await dispatch("getOrders");
    },
  },
};
