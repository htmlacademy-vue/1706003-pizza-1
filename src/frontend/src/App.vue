<template>
  <div id="app">
    <AppLayout>
      <transition
        name="slide"
        appear
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";

import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
