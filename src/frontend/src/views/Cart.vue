<template>
  <form class="layout-form" @submit.prevent="makeAnOrder">
    <CartPopup v-if="popup.isOpen" @closePopup="closePopup" />
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="!pizzas.length">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />
          <CartAdditionalList />
          <CartForm ref="cartForm" />
        </template>
      </div>
    </main>
    <CartFooter :orderCost="cost" />
    <router-view />
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import CartPopup from "@/modules/cart/components/CartPopup.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";

export default {
  name: "Cart",
  components: {
    CartPopup,
    CartFooter,
    CartList,
    CartAdditionalList,
    CartForm,
  },
  data() {
    return {
      popup: {
        isOpen: false,
      },
    };
  },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["cost"]),
  },
  methods: {
    ...mapActions("Cart", ["resetCartState"]),
    ...mapActions("Orders", ["setOrder"]),
    openPopup() {
      this.popup.isOpen = true;
    },
    closePopup() {
      this.popup.isOpen = false;
      this.resetCartState();
      if (this.user) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
    makeAnOrder() {
      this.openPopup();
      this.setOrder({
        order: {
          ...this.$refs.cartForm.getContactInfo(),
          pizzas: this.pizzas,
          misc: this.misc,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/layout-form.scss";
</style>
