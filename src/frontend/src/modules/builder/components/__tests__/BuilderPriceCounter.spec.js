import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import { formatCurrency } from "@/common/helpers.js";
import BuilderPriceCounter from '@/modules/builder/components/BuilderPriceCounter';

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

describe('BuilderPriceCounter', () => {
  let store;
  let wrapper;

  const propsData = {
    price: 100,
    disabled: true,
  }

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is formatted price', () => {
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.find('[data-test="pizza-price"]').text())
      .toBe(`Итого: ${ formatCurrency(propsData.price) }`)
  });

  it ('is emit event add to order', async () => {
    propsData.disabled = false;
    createPizza(store);
    builderInitState(store);
    createComponent({ localVue, store, propsData });
    const btn = wrapper.findAll('[data-test="btn-add-to-order"]');
    await btn.trigger('click');
    expect(wrapper.emitted().addToOrder).toBeTruthy();
  });
});
