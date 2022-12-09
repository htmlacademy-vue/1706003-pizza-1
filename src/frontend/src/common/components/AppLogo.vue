<template>
  <img
    class="logo"
    src="@/assets/img/logo.svg"
    alt="V!U!E! Pizza logo"
    :width="width"
    :height="height"
  >
</template>

<script>
export default {
  name: "AppLogo",
  props: {
    width: {
      type: Number,
      default: 90,
    },
    height: {
      type: Number,
      default: 40,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 90px;
  height: 40px;
}
</style>
