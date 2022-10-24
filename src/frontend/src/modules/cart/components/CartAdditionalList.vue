<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalListItem
        v-for="product in misc"
        :key="product.id"
        :miscId="product.id"
        :name="product.name"
        :image="product.image"
        :price="product.price"
        @changeQty="
          changeMiscQty({ misc: { miscId: product.id, quantity: $event } })
        "
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import CartAdditionalListItem from "@/modules/cart/components/CartAdditionalListItem.vue";

export default {
  name: "CartAdditionalList",
  components: { CartAdditionalListItem },
  computed: {
    ...mapState(["misc"]),
  },
  methods: {
    ...mapActions("Cart", ["changeMiscQty"]),
  },
};
</script>

<style lang="scss" scoped>
.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
