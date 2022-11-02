<template>
  <ul class="order__list">
    <OrdersListItem
      v-for="pizza in pizzas"
      :key="pizza.id"
      :pizza="pizza"
    />
  </ul>
</template>

<script>
import OrdersListItem from "@/modules/orders/components/OrdersListItem.vue";

export default {
  name: "OrdersList",
  components: { OrdersListItem },
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
