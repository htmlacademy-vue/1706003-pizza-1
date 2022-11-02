<template>
  <li class="additional-list__item sheet">
    <div>
      <p class="additional-list__description">
        <img
          :src="image"
          :alt="name"
          width="39"
          height="60"
        >
        <span>{{ name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <ItemCounter
          :min="0"
          :counter="quantity"
          :button-color="'orange'"
          class="additional-list__counter"
          @changeCounter="changeQty"
        />

        <div class="additional-list__price">
          <b>× {{ formattedPrice }}</b>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "CartAdditionalListItem",
  components: { ItemCounter },
  props: {
    miscId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("Cart", ["misc"]),

    formattedPrice() {
      return formatCurrency(this.price);
    },
    quantity() {
      return this.misc.find((product) => product.miscId === this.miscId)
        .quantity;
    },
  },
  methods: {
    changeQty(qty) {
      this.$emit("changeQty", qty);
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
