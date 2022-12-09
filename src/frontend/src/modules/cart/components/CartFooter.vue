<template>
  <section class="footer">
    <div class="footer__more">
      <AppButtonLink
        to="/"
        :modifier="['secondary', 'arrow']"
      >
        Хочу еще одну
      </AppButtonLink>
    </div>
    <p class="footer__text">
      Перейти к конструктору
      <br>
      чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b data-test="cart-cost">
        Итого: {{ formattedOrderCost }}
      </b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="submit"
        class="button"
        :disabled="!orderCost"
        data-test="btn-place-an-order"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { formatCurrency } from "@/common/helpers.js";

import AppButton from "@/common/components/AppButton.vue";
import AppButtonLink from "@/common/components/AppButtonLink.vue";

export default {
  name: "CartFooter",
  components: { AppButton, AppButtonLink },
  props: {
    orderCost: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedOrderCost() {
      return formatCurrency(this.orderCost);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  .button {
    padding: 16px 14px;
  }
}
</style>
