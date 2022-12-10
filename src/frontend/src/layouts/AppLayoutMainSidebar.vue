<template>
  <div class="sidebar">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      class="link"
      :class="{ 'link--active': path === link.to }"
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

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  padding-top: 30px;

  background-color: rgba($green-500, 0.05);
}

.link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}
</style>
