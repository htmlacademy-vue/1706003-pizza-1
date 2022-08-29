<template>
  <div class="app-layout">
    <AppLayoutHeader :user="user" :cost="cost" />
    <IndexHome
      :doughArray="pizza.dough"
      :ingredientsArray="pizza.ingredients"
      :saucesArray="pizza.sauces"
      :sizesArray="pizza.sizes"
    />
  </div>
</template>

<script>
import user from "@/static/user.json";
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";

import { normalizeUser, normalizePizza } from "@/common/helpers.js";

import { uniqueId } from "lodash";

import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import IndexHome from "@/views/Index.vue";

export default {
  name: "AppLayout",
  components: {
    IndexHome,
    AppLayoutHeader,
  },
  data() {
    return {
      order: misc,
      user: normalizeUser(user),
      pizza: normalizePizza(pizza),
    };
  },
  methods: {
    addPizzaToOrder(pizza) {
      this.order.push({
        id: uniqueId(),
        image: "/public/img/product.svg",
        ...pizza,
      });
    },
  },
  computed: {
    cost() {
      return this.order.reduce((cost, product) => cost + product.price, 0);
    },
  },
};
</script>
