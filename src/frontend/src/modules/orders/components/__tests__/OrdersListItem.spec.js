import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import { formatCurrency } from "@/common/helpers.js";
import OrdersListItem from '@/modules/orders/components/OrdersListItem';


const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough;
const ingredients = pizza.ingredients;
const sauces = pizza.sauces;
const sizes = pizza.sizes;
const orderedPizza = {
  id:1,
  name:"test",
  quantity:3,
  sauceId:1,
  doughId:1,
  sizeId:1,
  orderId:1,
  ingredients:[
    {quantity:1, ingredientId:1},
    {quantity:0, ingredientId:2},
    {quantity:0, ingredientId:3},
    {quantity:0, ingredientId:4},
    {quantity:0, ingredientId:5},
    {quantity:0, ingredientId:6},
    {quantity:0, ingredientId:7},
    {quantity:0, ingredientId:8},
    {quantity:0, ingredientId:9},
    {quantity:0, ingredientId:10},
    {quantity:0, ingredientId:11},
    {quantity:0, ingredientId:12},
    {quantity:0, ingredientId:13},
    {quantity:0, ingredientId:14},
    {quantity:0, ingredientId:15}
  ],
  cost:1149
}


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

describe('OrdersListItem', () => {
  let wrapper;
  let dispatch;
  let store;

  const mocks = {
    $store: {
      dispatch,
    },
  };

  const propsData = {
    pizza: orderedPizza,
  };

  const createComponent = (options) => {
    wrapper = mount(OrdersListItem, options);
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

  it ('is display order item price', () => {
    createPizza(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.find('[data-test="order-item-price"]').text())
    .toBe(`${orderedPizza.quantity}x${formatCurrency(orderedPizza.cost/orderedPizza.quantity)}`);
  });
});