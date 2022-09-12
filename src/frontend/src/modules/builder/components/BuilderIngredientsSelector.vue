<template>
  <div class="content__ingredients">
    <ContentSheet :contentClasses="['ingredients']">
      <template #title>Выберите ингредиенты</template>
      <template #content>
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in normolizedSauces"
            :key="sauce.id"
            :value="sauce.id"
            :name="'sauce'"
            :checked="selectedSauceId === sauce.id"
            @change="changeSauceId({ id: sauce.id })"
            class="radio ingredients__input"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in normolizedIngredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="ingredientQtyById(ingredient.id) < 3"
              >
                <SelectorItem
                  :class="`filling--${ingredient.value}`"
                  :ingredient="ingredient.name"
                />
              </AppDrag>
              <ItemCounter
                :min="0"
                :max="3"
                :counter="ingredientQtyById(ingredient.id)"
                @changeCounter="
                  changeIngredientQty({ id: ingredient.id, quantity: $event })
                "
                class="ingredients__counter"
              />
            </li>
          </ul>
        </div>
      </template>
    </ContentSheet>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["normolizedSauces", "normolizedIngredients"]),
    selectedSauceId() {
      return this.$store.state.Builder.sauceId;
    },
    selectedIngredients() {
      return this.$store.state.Builder.ingredients;
    },
  },
  methods: {
    ...mapActions("Builder", ["changeSauceId", "changeIngredientQty"]),
    ingredientQtyById(id) {
      const ingredient = this.selectedIngredients.find(
        (ingredient) => ingredient.ingredientId === id
      );
      return ingredient.quantity;
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
