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
            :selectedDeliveryMethod="contactInfo.address.comment"
            :phone="contactInfo.phone"
            :street="contactInfo.address.street"
            :building="contactInfo.address.building"
            :flat="contactInfo.address.flat"
            @changeDeliveryMethods="changeDeliveryMethods"
            @changePhone="changePhone"
            @changeStreet="changeStreet"
            @changeBuilding="changeBuilding"
            @changeFlat="changeFlat"
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
      deliveryMethods: [
        { id: 1, text: "Заберу сам" },
        { id: 2, text: "Новый адрес" },
        { id: 3, text: "Дом" },
      ],
      contactInfo: {
        phone: "",
        address: {
          street: "",
          building: "",
          flat: "",
          comment: 1,
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
    changeDeliveryMethods(newDeliveryMethods) {
      this.contactInfo.address.comment = newDeliveryMethods;
    },
    changePhone(newPhone) {
      this.contactInfo.phone = newPhone;
    },
    changeStreet(newStreet) {
      this.contactInfo.address.street = newStreet;
    },
    changeBuilding(newBuilding) {
      this.contactInfo.address.building = newBuilding;
    },
    changeFlat(newFlat) {
      this.contactInfo.address.flat = newFlat;
    },
  },
  computed: {
    ...mapState("Cart", ["misc", "pizzas"]),
    ...mapGetters("Cart", ["cost"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/layout-form.scss";
</style>
