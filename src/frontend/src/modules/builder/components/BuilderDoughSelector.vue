<template>
  <div class="content__dough">
    <ContentSheet :contentClasses="['dough']">
      <template #title>Выберите тесто</template>
      <template #content>
        <RadioButton
          v-for="dough in normolizedDought"
          :key="dough.id"
          :value="dough.id"
          :name="'dough'"
          :checked="selectedDoughId === dough.id"
          @change="changeBuilderEntity({ entity: 'doughId', value: dough.id })"
          class="dough__input"
          :class="`dough__input--${dough.value}`"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
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
  name: "BuilderDoughSelector",
  components: { ContentSheet, RadioButton },
  computed: {
    ...mapGetters(["normolizedDought"]),
    selectedDoughId() {
      return this.$store.state.Builder.doughId;
    },
  },
  methods: {
    ...mapActions("Builder", ["changeBuilderEntity"]),
  },
};
</script>

<style lang="scss">
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
