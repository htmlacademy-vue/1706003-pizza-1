<template>
  <div class="content__ingredients">
    <ContentSheet :contentClasses="['ingredients']">
      <template #title>Выберите ингредиенты</template>
      <template #content>
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in saucesArray"
            :key="sauce.id"
            :value="sauce.value"
            :name="'dough'"
            :isChecked="curentSauce.value === sauce.value"
            @change="changeSauce"
            class="radio ingredients__input"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredientsArray"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="ingredient.total < 3"
              >
                <SelectorItem
                  :class="`filling--${ingredient.value}`"
                  :ingredient="ingredient.name"
                />
              </AppDrag>
              <ItemCounter
                :min="0"
                :max="3"
                :counter="ingredient.total"
                @changeCounter="
                  (counter) => changeCounter(ingredient.value, counter)
                "
              />
            </li>
          </ul>
        </div>
      </template>
    </ContentSheet>
  </div>
</template>

<script>
import ContentSheet from "@/common/components/ContentSheet.vue";
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import RadioButton from "@/common/components/RadioButton.vue";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ContentSheet,
    SelectorItem,
    ItemCounter,
    RadioButton,
    AppDrag,
  },
  props: {
    saucesArray: {
      type: Array,
      required: true,
    },
    curentSauce: {
      type: Object,
      required: true,
    },
    ingredientsArray: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeSauce(value) {
      this.$emit("changeSauce", value);
    },
    chageAmountIngredient(action, value) {
      this.$emit("chageAmountIngredient", action, value);
    },
    changeCounter(value, counter) {
      this.$emit("chageAmountIngredient", value, counter);
    },
  },
};
</script>

<style lang="scss">
.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
