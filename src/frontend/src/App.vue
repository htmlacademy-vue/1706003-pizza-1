<template>
  <div id="app">
    <AppLayout>
      <router-view
        :doughArray="pizza.dough"
        :ingredientsArray="pizza.ingredients"
        :saucesArray="pizza.sauces"
        :sizesArray="pizza.sizes"
      />
    </AppLayout>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";

import { normalizePizza } from "@/common/helpers.js";

import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      pizza: normalizePizza(pizza),
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
