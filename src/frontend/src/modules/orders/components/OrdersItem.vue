<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b data-test="order-number">
          Заказ #{{ orderId }}
        </b>
      </div>

      <div class="order__sum">
        <span data-test="order-sum">
          Сумма заказа: {{ cost }}
        </span>
      </div>

      <div class="order__button">
        <AppButton
          type="button"
          class="button"
          :modifier="['secondary']"
          data-test="btn-dlt-order"
          @click="deleteOrder({ orderId })"
        >
          Удалить
        </AppButton>
      </div>
      <div class="order__button">
        <AppButton
          type="button"
          class="button"
          data-test="btn-rpt-order"
          @click="repeatOrder({ orderId })"
        >
          Повторить
        </AppButton>
      </div>
    </div>

    <OrdersList :pizzas="pizzas" />

    <OrdersAdditionalList :misc="misc" />

    <p
      class="order__address"
      data-test="oredr-address"
    >
      {{ address ? `Адрес доставки: ${address}` : "Самовывоз" }}
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import { formatCurrency } from "@/common/helpers.js";

import omit from "lodash/omit";

import OrdersAdditionalList from "@/modules/orders/components/OrdersAdditionalList.vue";
import OrdersList from "@/modules/orders/components/OrdersList.vue";

import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "OrdersItem",
  components: { OrdersAdditionalList, OrdersList, AppButton },
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["formattedOrders"]),
    ...mapState("Orders", ["orders"]),
    order() {
      return this.formattedOrders.find((order) => order.orderId === this.orderId);
    },

    address() {
      return this.order.orderAddress?.name || null;
    },

    pizzas() {
      return this.order.orderPizzas;
    },

    misc() {
      return this.order.orderMisc;
    },

    cost() {
      return formatCurrency(this.order.cost);
    },
  },

  methods: {
    ...mapActions("Orders", ["deleteOrder"]),
    ...mapActions("Cart", [
      "resetCartState",
      "addPizzaToCart",
      "changeMiscQty",
    ]),
    
    repeatOrder({ orderId }) {
      this.resetCartState();
      const pizzas = this.orders
        .find((order) => order.orderId === orderId)
        .orderPizzas.map((pizza) => ({ ...pizza, id: pizza.pizzaId }));
      const misc = this.orders
        .find((order) => order.orderId === orderId)
        .orderMisc.map((misc) => ({ ...misc, miscId: misc.miscId }));

      pizzas.forEach((pizza) => {
        this.addPizzaToCart({ pizza: omit(pizza, ["orderId"]) });
      });
      misc.forEach((misc) => {
        this.changeMiscQty({ misc: omit(misc, ["orderId"]) });
      });
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}
.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
