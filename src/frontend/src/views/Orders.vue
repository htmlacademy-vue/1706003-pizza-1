<template>
  <div>
    <div class="layout__title">
      <AppTitle :modifier="['big']">
        История заказов
      </AppTitle>
    </div>

    <OrdersItem
      v-for="order in formattedOrders"
      :key="order.orderId"
      :order-id="order.orderId"
      data-test="order"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import OrdersItem from "@/modules/orders/components/OrdersItem.vue";

import AppTitle from "@/common/components/AppTitle.vue";

export default {
  name: "Orders",
  components: { OrdersItem, AppTitle },
  computed: {
    ...mapGetters("Orders", ["formattedOrders"]),
  },
  created() {
    this.getOrders();
  },
  methods: {
    ...mapActions("Orders", ["getOrders"]),
  },
};
</script>

<style lang="scss" scoped>
.layout__title {
  margin-bottom: 27px;
}
</style>