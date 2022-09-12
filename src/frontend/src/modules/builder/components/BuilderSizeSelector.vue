<template>
  <div class="content__diameter">
    <ContentSheet :contentClasses="['diameter']">
      <template #title>Выберите размер</template>
      <template #content>
        <RadioButton
          v-for="size in normolizedSizes"
          :key="size.id"
          :value="size.id"
          :name="'size'"
          :checked="selectedSizeId === size.id"
          @change="changeSizeId({ id: size.id })"
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
import { mapActions, mapGetters } from "vuex";

import ContentSheet from "@/common/components/ContentSheet.vue";
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderSizeSelector",
  components: { ContentSheet, RadioButton },
  computed: {
    ...mapGetters(["normolizedSizes"]),
    selectedSizeId() {
      return this.$store.state.Builder.sizeId;
    },
  },
  methods: {
    ...mapActions("Builder", ["changeSizeId"]),
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
