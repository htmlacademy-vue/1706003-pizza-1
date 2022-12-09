import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import CartListItem from '@/modules/cart/components/CartListItem';


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

describe('CartListItem', () => {
  let wrapper;
  let dispatch;
  let store;

  const mocks = {
    $store: {
      dispatch,
    },
  };

  const propsData = {
    name: 'Test',
    doughId: 1,
    sauceId: 1,
    sizeId: 1,
    quantity: 1,
    ingredientsId: [
      {ingredientId:1,quantity:1},
      {ingredientId:2,quantity:1},
      {ingredientId:3,quantity:1},
      {ingredientId:4,quantity:0},
      {ingredientId:5,quantity:0},
      {ingredientId:6,quantity:0},
      {ingredientId:7,quantity:0},
      {ingredientId:8,quantity:0},
      {ingredientId:9,quantity:0},
      {ingredientId:10,quantity:0},
      {ingredientId:11,quantity:0},
      {ingredientId:12,quantity:0},
      {ingredientId:13,quantity:0},
      {ingredientId:14,quantity:0},
      {ingredientId:15,quantity:0}
    ],
  };

  const createComponent = (options) => {
    wrapper = mount(CartListItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is changing pizza', async () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    const btn = wrapper.find('[data-test="btn-change-pizza"]');
    await btn.trigger('click');
    expect(wrapper.emitted().changePizza).toBeTruthy();
  });

  it ('is changing pizza qty - 1', async () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    const counter = wrapper.find('[data-test="item-counter"]');

    const minus = counter.find('.counter__button--minus');
    await minus.trigger('click');
    expect(wrapper.emitted().changeQty[0][0]).toBe(propsData.quantity - 1);
  });

  it ('is changing pizza qty + 1', async () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    const counter = wrapper.find('[data-test="item-counter"]');

    const plus = counter.find('.counter__button--plus');
    await plus.trigger('click');
    expect(wrapper.emitted().changeQty[0][0]).toBe(propsData.quantity + 1);
  });

  it ('is display formatted price', async () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    const price = wrapper.find('[data-test="pizza-item-price"]').find('b')
    expect(price.text()).toContain("467,00 ₽");
  });
  
});