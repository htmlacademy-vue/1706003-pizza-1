<template>
  <ul class="order__additional">
    <OrdersAdditionalListItem
      v-for="product in misc"
      :key="product.id"
      :id="product.miscId"
      :quantity="product.quantity"
    />
  </ul>
</template>

<script>
import OrdersAdditionalListItem from "@/modules/orders/components/OrdersAdditionalListItem.vue";

export default {
  name: "OrdersAdditionalList",
  components: { OrdersAdditionalListItem },
  props: {
    misc: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
