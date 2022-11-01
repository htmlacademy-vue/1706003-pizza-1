<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutMainSidebar />
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutMainSidebar from "@/layouts/AppLayoutMainSidebar";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
    AppLayoutMainSidebar,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex: 1;
}
.layout__content {
  position: relative;
  
  padding-top: 22px;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
  flex: 1;
}
</style>
