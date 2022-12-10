<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
const MOVE = "move";
const DATA_TRANSFER_PAYLOAD = "payload";

export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },

    draggable: {
      type: Boolean,
      required: true,
    },
  },
  
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
