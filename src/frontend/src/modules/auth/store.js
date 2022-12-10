import { normalizeUser } from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
    addresses: [],
  },
  mutations: {
    SET_ENTITY(state, { entity, value }) {
      state[entity] = value;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        "SET_ENTITY",
        {
          module: "Auth",
          entity: "isAuthenticated",
          value: false,
        },
        { root: true }
      );
      commit(
        "SET_ENTITY",
        {
          module: "Auth",
          entity: "user",
          value: null,
        },
        { root: true }
      );
      commit(
        "SET_ENTITY",
        {
          module: "Auth",
          entity: "addresses",
          value: [],
        },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          "SET_ENTITY",
          {
            module: "Auth",
            entity: "isAuthenticated",
            value: true,
          },
          { root: true }
        );
        commit(
          "SET_ENTITY",
          {
            module: "Auth",
            entity: "user",
            value: data,
          },
          { root: true }
        );
        await dispatch("getAddresses");
      } catch (e) {
        console.log("Ошибка авторизации: ", e);
      }
    },

    async getAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      addresses.forEach((item) => {delete Object.assign(item, {['addressId']: item['id'] })['id'];});
      commit(
        "SET_ENTITY",
        {
          module: "Auth",
          entity: "addresses",
          value: addresses,
        },
        { root: true }
      );
    },

    async setAddress(
      { state, dispatch },
      { name, street, building, flat, comment }
    ) {
      await this.$api.addresses.post({
        name,
        userId: state.user.id,
        street,
        building,
        flat,
        comment,
      });
      await dispatch("getAddresses");
    },

    async updateAddress(
      { state, dispatch },
      { name, street, building, flat, comment, id }
    ) {
      await this.$api.addresses.put({
        id,
        name,
        userId: state.user.id,
        street,
        building,
        flat,
        comment,
      });
      await dispatch("getAddresses");
    },

    async deleteAddress({ dispatch }, { id }) {
      await this.$api.addresses.delete(id);
      await dispatch("getAddresses");
    },
  },
  getters: {
    normolizedUser(state) {
      return state.user ? normalizeUser(state.user) : state.user;
    },
  },
};
