<template>
  <component :is="layout" class="app-layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;

  min-width: 960px;
  min-height: 100vh;
}
</style>
