import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";

import { normalize } from "@/common/helpers.js";

import pizza from "@/static/pizza.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dough: pizza.dough,
    ingredients: pizza.ingredients,
    sauces: pizza.sauces,
    sizes: pizza.sizes,
  },
  getters: {
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
  },
  mutations: {},
  actions: {},
  modules,
});
