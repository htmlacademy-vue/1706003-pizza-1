<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      <slot name="title">
        Заголовок
      </slot>
    </h2>
    <form
      class="sheet__content"
      :class="contentClasses"
    >
      <slot name="content" />
    </form>
  </div>
</template>

<script>
export default {
  name: "ContentSheet",
  props: {
    contentClasses: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--small {
    @include b-s18-h21;
  }
}
</style>
