<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrdersItem
      v-for="order in formattedOrders"
      :key="order.id"
      :id="order.id"
      :address="order.orderAddress.name"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import OrdersItem from "@/modules/orders/components/OrdersItem.vue";

export default {
  name: "Orders",
  components: { OrdersItem },
  computed: {
    ...mapGetters("Orders", ["formattedOrders"]),
  },
  methods: {
    ...mapActions("Orders", ["getOrders"]),
  },
  created() {
    this.getOrders();
  },
};
</script>
