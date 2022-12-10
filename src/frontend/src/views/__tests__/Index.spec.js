import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import Index from '@/views/Index/Index.vue';
import AppTitle from "@/common/components/AppTitle.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

const localVue = createLocalVue();
localVue.component('AppTitle', AppTitle);
localVue.component('BuilderDoughSelector', BuilderDoughSelector);
localVue.component('BuilderSizeSelector', BuilderSizeSelector);
localVue.component('BuilderIngredientsSelector', BuilderIngredientsSelector);
localVue.component('BuilderPriceCounter', BuilderPriceCounter);
localVue.component('BuilderPizzaView', BuilderPizzaView);
localVue.use(Vuex);


const dough = pizza.dough;
const ingredients = pizza.ingredients;
const sauces = pizza.sauces;
const sizes = pizza.sizes;

dough.forEach((item) => {delete Object.assign(item, {['doughId']: item['id'] })['id'];});
ingredients.forEach((item) => {delete Object.assign(item, {['ingredientId']: item['id'] })['id'];});
sauces.forEach((item) => {delete Object.assign(item, {['sauceId']: item['id'] })['id'];});
sizes.forEach((item) => {delete Object.assign(item, {['sizeId']: item['id'] })['id'];});
sizes.sort(
  (prevSize, nextSize) => prevSize.multiplier - nextSize.multiplier
);

const defaultDoughId = dough[0].doughId;
const defaultSauceId = sauces[0].sauceId;
const defaultSizeId = sizes[0].sizeId;
const ingredientsQty = ingredients.map((ingredient) => ({
  ingredientId: ingredient.ingredientId,
  quantity: 0,
}));

const createPizza = (store) => {
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'dough',
    value: dough,
  });
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'ingredients',
    value: ingredients,
  });
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'sauces',
    value: sauces,
  });
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'sizes',
    value: sizes,
  });
};

const builderInitState = (store) => {
  store.commit('SET_ENTITY', {
    module: 'Builder',
    entity: 'doughId',
    value: defaultDoughId,
  });
  store.commit('SET_ENTITY', {
    module: 'Builder',
    entity: 'ingredients',
    value: ingredientsQty,
  });
  store.commit('SET_ENTITY', {
    module: 'Builder',
    entity: 'sauceId',
    value: defaultSauceId,
  });
  store.commit('SET_ENTITY', {
    module: 'Builder',
    entity: 'sizeId',
    value: defaultSizeId,
  });
};

describe('Index', () => {
  const stubs = ['router-view'];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changeBuilderEntity: jest.fn(),
        resetBuilderState: jest.fn(),
      },
      Cart: {
        addPizzaToCart: jest.fn(),
      }
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is added pizza to cart', async () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store, stubs });

    const nameInput = wrapper.find('[data-test="name-input"]');

    nameInput.element.value = 'PizzaName';
    await nameInput.trigger('input');

    const priceCounter = wrapper.find('[data-test="price-counter"]');
    priceCounter.vm.$emit('addToOrder');

    expect(actions.Builder.changeBuilderEntity)
      .toHaveBeenCalledWith(
        expect.any(Object), {"entity": "name", "value": "PizzaName"}
      );

    expect(actions.Cart.addPizzaToCart)
      .toHaveBeenCalledWith(
        expect.any(Object), {
          pizza: {
            doughId: 1,
            ingredients: [
              {"ingredientId": 1, "quantity": 0},
              {"ingredientId": 2, "quantity": 0},
              {"ingredientId": 3, "quantity": 0},
              {"ingredientId": 4, "quantity": 0},
              {"ingredientId": 5, "quantity": 0},
              {"ingredientId": 6, "quantity": 0}, 
              {"ingredientId": 7, "quantity": 0},
              {"ingredientId": 8, "quantity": 0},
              {"ingredientId": 9, "quantity": 0},
              {"ingredientId": 10, "quantity": 0},
              {"ingredientId": 11, "quantity": 0},
              {"ingredientId": 12, "quantity": 0},
              {"ingredientId": 13, "quantity": 0},
              {"ingredientId": 14, "quantity": 0},
              {"ingredientId": 15, "quantity": 0}
            ],
            name: "",
            quantity: 1,
            sauceId: 1, 
            sizeId: 1,
          }
        });

    expect(actions.Builder.resetBuilderState).toHaveBeenCalled();

  });
});
