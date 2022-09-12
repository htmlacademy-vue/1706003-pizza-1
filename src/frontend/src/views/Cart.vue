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
          <CartForm
            :deliveryMethods="deliveryMethods"
            :selectedDeliveryMethod.sync="selectedDeliveryMethods"
            :phone.sync="contactInfo.phone"
            :street.sync="contactInfo.address.street"
            :building.sync="contactInfo.address.building"
            :flat.sync="contactInfo.address.flat"
          />
        </template>
      </div>
    </main>
    <CartFooter :orderCost="cost" />
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import CartPopup from "@/modules/cart/components/CartPopup.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";

const standartDeliveryMethods = [
  { id: 1, name: "Заберу сам" },
  { id: 2, name: "Новый адрес" },
];

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
      selectedDeliveryMethods: standartDeliveryMethods[0],
      contactInfo: {
        phone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: "",
        },
      },
    };
  },
  methods: {
    ...mapActions("Cart", ["resetStateModule"]),
    openPopup() {
      this.popup.isOpen = true;
    },
    closePopup() {
      this.popup.isOpen = false;
      this.resetStateModule();
      this.$router.push("/");
    },
    makeAnOrder() {
      this.openPopup();
      console.log("Order", {
        ...this.contactInfo,
        pizzas: this.pizzas,
        misc: this.misc,
      });
    },
  },
  computed: {
    ...mapState("Cart", ["misc", "pizzas"]),
    ...mapState("Auth", ["addresses", "user"]),
    ...mapGetters("Cart", ["cost"]),
    deliveryMethods() {
      let methods = standartDeliveryMethods.slice();
      if (this.user && this.user.id) {
        methods = [
          ...methods,
          ...this.addresses.filter((adress) => adress.userId === this.user.id),
        ];
      }
      return methods;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/layout-form.scss";
</style>
