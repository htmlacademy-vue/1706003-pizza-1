<template>
  <li class="additional__item">
    <img
      :src="miscItem.image"
      width="20"
      height="30"
      :alt="miscItem.name"
    >
    <p>
      <span>{{ miscItem.name }}</span>
      <b data-test="add-item-price">
        {{ `${quantity}x${formatedPrice}` }}
      </b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "OrdersAdditionalListItem",
  props: {
    miscId: {
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
      return this.misc.find((item) => item.miscId === this.miscId);
    },
    
    formatedPrice() {
      return formatCurrency(this.miscItem.price);
    },
  },
};
</script>

<style lang="scss" scoped>
  .additional__item {
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
</style>
