<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      class="visually-hidden"
      @change="$emit('change', $event.target.value)"
    >
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}
</style>
