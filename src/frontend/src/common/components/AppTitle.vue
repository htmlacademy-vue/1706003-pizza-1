<template>
  <h1
    class="title"
    :class="{
      'title--big': modifier.includes('big'),
      'title--small': modifier.includes('small'),
    }"
  >
    <slot />
  </h1>
</template>

<script>
export default {
  name: "AppTitle", 
  props: {
    modifier: {
      type: Array,
      default: () => ([]),
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}
</style>