<template>
  <form
    class="layout-form"
    @submit.prevent="makeAnOrder"
  >
    <transition name="show">
      <CartPopup
        v-if="popup.isOpen"
        @closePopup="closePopup"
      />
    </transition>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle :modifier="['big']">
            Корзина
          </AppTitle>
        </div>

        <div
          v-if="!pizzas.length"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />
          <CartAdditionalList class="cart__additional" />
          <CartForm ref="cartForm" />
        </template>
      </div>
    </main>
    <CartFooter :order-cost="cost" />
    <transition
      name="show"
      appear
    >
      <router-view />
    </transition>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CartPopup from "@/modules/cart/components/CartPopup.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import AppTitle from "@/common/components/AppTitle.vue";

export default {
  name: "Cart",
  components: {
    CartPopup,
    CartFooter,
    CartList,
    CartAdditionalList,
    CartForm,
    AppTitle,
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
.layout-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.container {
  width: 770px;
  margin: 0 auto;
}
.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
// Не могу понять почему анимация при закрытии модального окна не работает
</style>
