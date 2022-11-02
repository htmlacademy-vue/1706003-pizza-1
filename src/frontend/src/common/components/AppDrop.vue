<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
const DATA_TRANSFER_PAYLOAD = "payload";

export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );
        this.$emit("drop", transferData);
      }
    },
  },
};
</script>
