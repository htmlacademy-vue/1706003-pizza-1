<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      class="layout__link"
      :class="{ 'layout__link--active': path === link.to }"
    >
      {{ link.text }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutMainSidebar",
  data() {
    return {
      links: [
        {
          to: "/orders",
          text: "История заказов",
        },
        {
          to: "/profile",
          text: "Мои данные",
        },
      ],
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>
