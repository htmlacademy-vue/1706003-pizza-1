<template>
  <div class="app-layout">
    <AppLayoutHeader :user="user" :cost="cost" />
    <main class="layout">
      <AppLayoutMainSidebar />
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import user from "@/static/user.json";
import misc from "@/static/misc.json";

import { normalizeUser } from "@/common/helpers.js";

import AppLayoutMainSidebar from "@/layouts/AppLayoutMainSidebar";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
    AppLayoutMainSidebar,
  },
  data() {
    return {
      order: misc,
      user: normalizeUser(user),
    };
  },
  computed: {
    cost() {
      return this.order.reduce((cost, product) => cost + product.price, 0);
    },
  },
};
</script>
