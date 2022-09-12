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
