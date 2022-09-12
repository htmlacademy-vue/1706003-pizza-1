<template>
  <li class="additional-list__item sheet">
    <div>
      <p class="additional-list__description">
        <img :src="imgSrc" :alt="name" width="39" height="60" />
        <span>{{ name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <ItemCounter
          :min="0"
          :counter="quantity"
          :buttonColor="'orange'"
          @changeCounter="changeQty"
          class="additional-list__counter"
        />

        <div class="additional-list__price">
          <b>× {{ formattedPrice }}</b>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";

import { formatCurrency } from "@/common/helpers.js";

export default {
  name: "CartAdditionalListItem",
  components: { ItemCounter },
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      return formatCurrency(this.price);
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
