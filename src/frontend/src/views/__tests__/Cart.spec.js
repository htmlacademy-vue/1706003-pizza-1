import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import pizza from '@/static/pizza';
import Cart from '@/views/Cart';

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

const pizzas = {
  name: "тест",
  sauceId: 1,
  doughId: 1,
  sizeId: 1,
  quantity: 2,
  ingredients: [
    {ingredientId:1,quantity:1},
    {ingredientId:2,quantity:0},
    {ingredientId:3,quantity:0},
    {ingredientId:4,quantity:0},
    {ingredientId:5,quantity:0},
    {ingredientId:6,quantity:1},
    {ingredientId:7,quantity:0},
    {ingredientId:8,quantity:0},
    {ingredientId:9,quantity:0},
    {ingredientId:10,quantity:0},
    {ingredientId:11,quantity:1},
    {ingredientId:12,quantity:0},
    {ingredientId:13,quantity:0},
    {ingredientId:14,quantity:0},
    {ingredientId:15,quantity:0}
  ]
}

const authenticateUser = (store) => {
  store.commit('SET_ENTITY', {
    module: 'Auth',
    entity: 'user',
    value: user,
  });
  store.commit('SET_ENTITY', {
    module: 'Auth',
    entity: 'isAuthenticated',
    value: true,
  });
};

const pizzasState = (store) => {
  store.commit('SET_ENTITY', {
    module: 'Cart',
    entity: 'pizzas',
    value: [pizzas],
  });
}

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

describe('Cart', () => {
  let wrapper;
  let dispatch;
  let store;

  const mocks = {
    $store: {
      dispatch,
    },
  };
  const stubs = [
    'router-link',
    'router-view'
  ];

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('displays empty cart', () => {
    authenticateUser(store);    
    createComponent({ localVue, mocks, store, stubs  });
    expect(wrapper.find('[data-test="empty-cart"]').exists()).toBeTruthy();
  });

  it ('display pizzas in cart', () => {
    authenticateUser(store);
    createPizza(store)
    pizzasState(store);
    createComponent({ localVue, mocks, store, stubs  });
    expect(wrapper.find('[data-test="pizza-in-cart"]').exists()).toBeTruthy();
  });
});
