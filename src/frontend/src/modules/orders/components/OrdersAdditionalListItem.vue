<template>
  <li>
    <img :src="miscItem.image" width="20" height="30" :alt="miscItem.name" />
    <p>
      <span>{{ miscItem.name }}</span>
      <b>{{ `${quantity}x${formatedPrice}` }}</b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "OrdersAdditionalListItem",
  props: {
    id: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["misc"]),
    miscItem() {
      return this.misc.find((item) => item.id === this.id);
    },
    formatedPrice() {
      return formatCurrency(this.miscItem.price);
    },
  },
};
</script>
