<template>
  <ul class="additional-list">
    <CartAdditionalListItem
      v-for="product in misc"
      :key="product.miscId"
      :misc-id="product.miscId"
      :name="product.name"
      :image="product.image"
      :price="product.price"
      @changeQty="
        changeMiscQty({ misc: { miscId: product.miscId, quantity: $event } })
      "
    />
  </ul>
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
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
