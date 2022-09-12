<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', $event.target.value)"
      class="visually-hidden"
    />
    <slot></slot>
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
      required: false,
    },
  },
};
</script>

<style lang="scss">
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
