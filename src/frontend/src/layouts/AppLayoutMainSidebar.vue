<template>
  <div class="layout__sidebar sidebar">
    <a href="index.html" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </a>

    <a class="layout__link" href="#">История заказов</a>
    <a class="layout__link layout__link--active" href="#">Мои данные</a>
  </div>
</template>

<script>
export default {
  name: "AppLayoutMainSidebar",
};
</script>
