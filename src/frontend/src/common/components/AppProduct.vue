<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="name"
    >
    <div class="product__text">
      <h2>{{ name }}</h2>
      <ul>
        <li>{{ size }}, тесто {{ dough }}</li>
        <li>Соус: {{ sauce }}</li>
        <li>Начинка: {{ ingredients }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppProduct", 
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    dough: {
      type: String,
      required: true, 
    },
    sauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}

</style>