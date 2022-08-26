<template>
  <div class="content__diameter">
    <ContentSheet :contentClasses="['diameter']">
      <template #title>Выберите размер</template>
      <template #content>
        <RadioButton
          v-for="size in sizesArray"
          :key="size.id"
          :value="size.value"
          :name="'size'"
          :isChecked="curentSize.value === size.value"
          @change="changeSize"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </template>
    </ContentSheet>
  </div>
</template>

<script>
import ContentSheet from "@/common/components/ContentSheet.vue";
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderSizeSelector",
  components: { ContentSheet, RadioButton },
  props: {
    sizesArray: {
      type: Array,
      required: true,
    },
    curentSize: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeSize(value) {
      this.$emit("changeSize", value);
    },
  },
};
</script>

<style lang="scss">
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
