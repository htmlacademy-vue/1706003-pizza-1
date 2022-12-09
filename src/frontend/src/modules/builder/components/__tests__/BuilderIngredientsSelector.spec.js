import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector';

const localVue = createLocalVue();
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
  quantity: 1,
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

describe('BuilderIngredientsSelector', () => {
  let store;
  let wrapper;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        changeBuilderEntity: jest.fn(),
        changeIngredientQty: jest.fn(),
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
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is all ingredints showed', () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store });
    const ingredients = wrapper.findAll('.ingredients__item');
    expect(ingredients.length).toBe(ingredients.length);
  });

  it ('is changed pizza sauce', async () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store });
    const input = wrapper.findAll('.ingredients__input').at(1);
    await input.vm.$emit('change');
    expect(actions.Builder.changeBuilderEntity)
      .toHaveBeenCalledWith(
        expect.any(Object), {entity: "sauceId", value: sauces[1].sauceId}
    );
  });

  it ('is changed pizza ingredient', async () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store });
    const input = wrapper.findAll('.ingredients__counter').at(1);
    await input.vm.$emit('changeCounter', 2);
    expect(actions.Builder.changeIngredientQty)
      .toHaveBeenCalledWith(
        expect.any(Object), {ingredientId: 2, quantity: 2}
    );
  });
});
