import Vue from "vue";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";

import modules from "@/store/modules";

import { normalize } from "@/common/helpers.js";

Vue.use(Vuex);


export const state = () => ({
  dough: [],
  ingredients: [],
  sauces: [],
  sizes: [],
  misc: [],
});

export const mutations = ({
  SET_ENTITY(state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  ADD_ENTITY(state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  UPDATE_ENTITY(state, { module, entity, value, nameId, idx }) {
    if (module) {
      const index =
        idx ||
        state[module][entity].findIndex(
          (item) => item[nameId] === value[nameId]
        );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index =
        idx ||
        state[entity].findIndex((item) => item[nameId] === value[nameId]);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  DELETE_ENTITY(state, { module, entity, idx }) {
    if (module) {
      state[module][entity].splice(idx, 1);
    } else {
      state[entity].splice(idx, 1);
    }
  },
})

export const actions = ({
  async init({ dispatch }) {
    dispatch("fetchDough");
    dispatch("fetchIngredients");
    dispatch("fetchSauces");
    dispatch("fetchSizes");
    dispatch("fetchMisc");
  },
  async fetchDough({ commit }) {
    const dough = await this.$api.dough.query();
    dough.forEach((item) => {delete Object.assign(item, {['doughId']: item['id'] })['id'];});
    commit("SET_ENTITY", { module: null, entity: "dough", value: dough });
    commit("SET_ENTITY", {
      module: "Builder",
      entity: "doughId",
      value: dough[0].doughId,
    });
  },
  async fetchIngredients({ commit }) {
    const ingredients = await this.$api.ingredients.query();
    ingredients.forEach((item) => {delete Object.assign(item, {['ingredientId']: item['id'] })['id'];});
    commit("SET_ENTITY", {
      module: null,
      entity: "ingredients",
      value: ingredients,
    });
    commit("SET_ENTITY", {
      module: "Builder",
      entity: "ingredients",
      value: ingredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId,
        quantity: 0,
      })),
    });
  },
  async fetchSauces({ commit }) {
    const sauces = await this.$api.sauces.query();
    sauces.forEach((item) => {delete Object.assign(item, {['sauceId']: item['id'] })['id'];});
    commit("SET_ENTITY", { module: null, entity: "sauces", value: sauces });
    commit("SET_ENTITY", {
      module: "Builder",
      entity: "sauceId",
      value: sauces[0].sauceId,
    });
  },
  async fetchSizes({ commit }) {
    const sizes = await this.$api.sizes.query();
    sizes.forEach((item) => {delete Object.assign(item, {['sizeId']: item['id'] })['id'];});
    sizes.sort(
      (prevSize, nextSize) => prevSize.multiplier - nextSize.multiplier
    );
    commit("SET_ENTITY", { module: null, entity: "sizes", value: sizes });
    commit("SET_ENTITY", {
      module: "Builder",
      entity: "sizeId",
      value: sizes[0].sizeId,
    });
  },
  async fetchMisc({ commit }) {
    const misc = await this.$api.misc.query();
    misc.forEach((item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];});
    commit("SET_ENTITY", { module: null, entity: "misc", value: misc });
    commit("SET_ENTITY", {
      module: "Cart",
      entity: "misc",
      value: misc.map((misc) => ({
        miscId: misc.miscId,
        quantity: 0,
      })),
    });
  },
})

export const getters = ({
    normolizedDought(state) {
      return normalize(state.dough, "dough");
    },
    normolizedIngredients(state) {
      return normalize(state.ingredients, "ingredients");
    },
    normolizedSauces(state) {
      return normalize(state.sauces, "sauces");
    },
    normolizedSizes(state) {
      return normalize(state.sizes, "sizes");
    },
  })

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules
});