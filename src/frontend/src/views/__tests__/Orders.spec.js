import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import pizza from '@/static/pizza';
import miscData from '@/static/misc';
import Orders from '@/views/Orders/Index.vue';
import AppTitle from "@/common/components/AppTitle.vue";
import OrdersItem from "@/modules/orders/components/OrdersItem.vue";

const localVue = createLocalVue();
localVue.component('AppTitle', AppTitle);
localVue.component('OrdersItem', OrdersItem);
localVue.use(Vuex);

const orders = [
  {
    orderId: 1,
    userId: "string",
    addressId: 1,
    orderPizzas: [
      {
        id: 1,
        name: "string",
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        quantity: 1,
        orderId: 1,
        ingredients: [
          {
            id: 1,
            pizzaId: 1,
            ingredientId: 1,
            quantity: 1
          }
        ]
      }
    ],
    orderMisc: [
      {
        id: 1,
        orderId: 1,
        miscId: 1,
        quantity: 1
      }
    ],
    orderAddress: {
      id: 1,
      name: "string",
      street: "string",
      building: "string",
      flat: "string",
      comment: "string",
      userId: "string"
    }
  }
]
const dough = pizza.dough;
const ingredients = pizza.ingredients;
const sauces = pizza.sauces;
const sizes = pizza.sizes;
const misc = miscData;

dough.forEach((item) => {delete Object.assign(item, {['doughId']: item['id'] })['id'];});
ingredients.forEach((item) => {delete Object.assign(item, {['ingredientId']: item['id'] })['id'];});
sauces.forEach((item) => {delete Object.assign(item, {['sauceId']: item['id'] })['id'];});
sizes.forEach((item) => {delete Object.assign(item, {['sizeId']: item['id'] })['id'];});
sizes.sort(
  (prevSize, nextSize) => prevSize.multiplier - nextSize.multiplier
);
misc.forEach((item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];});

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

const createMisc = (store) => {
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'misc',
    value: misc,
  });
}

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

const ordersInitState = (store) => {
  store.commit('SET_ENTITY', 
  {
    module: "Orders",
    entity: "orders",
    value: orders,
  })
};

describe('Orders', () => {
  let login;
  let store;
  let dispatch;
  let wrapper;

  const methods = {
    login
  };

  const mocks = {
    $store: {
      dispatch
    },
  };

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    login = jest.fn();
    methods.login = login;
    store = generateMockStore();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authenticateUser(store);
    ordersInitState(store);
    createPizza(store);
    createMisc(store);
    builderInitState(store);
    createComponent({ localVue, mocks, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders orders', () => {
    authenticateUser(store);
    ordersInitState(store);
    createPizza(store);
    createMisc(store);
    builderInitState(store);
    createComponent({ localVue, mocks, store });
    const userOrders = wrapper.findAll('[data-test="order"]');
    expect(Array.from(userOrders).length).toEqual(orders.length);
  });

});