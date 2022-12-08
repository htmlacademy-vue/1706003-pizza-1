import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import misc from '@/static/misc';
import OrdersItem from '@/modules/orders/components/OrdersItem';


const localVue = createLocalVue();
localVue.use(Vuex);

const dough = pizza.dough;
const ingredients = pizza.ingredients;
const sauces = pizza.sauces;
const sizes = pizza.sizes;
const miscDataState = misc;

dough.forEach((item) => {delete Object.assign(item, {['doughId']: item['id'] })['id'];});
ingredients.forEach((item) => {delete Object.assign(item, {['ingredientId']: item['id'] })['id'];});
sauces.forEach((item) => {delete Object.assign(item, {['sauceId']: item['id'] })['id'];});
sizes.forEach((item) => {delete Object.assign(item, {['sizeId']: item['id'] })['id'];});
sizes.sort(
  (prevSize, nextSize) => prevSize.multiplier - nextSize.multiplier
);
miscDataState.forEach(
  (item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];}
);

const orders = [
  {
    "phone": "+7 777 777 77 77",
    "userId": "3e8b850f-4fba-4e6d-ab85-4363846402eb",
    "addressId": null,
    "orderPizzas": [
      {
        "id":4,
        "name":"Test_1",
        "quantity":1,
        "sauceId":1,
        "doughId":1,
        "sizeId":2,
        "orderId":3,
        "ingredients": [
          {"id":46,"quantity":1,"pizzaId":4,"ingredientId":1},
          {"id":47,"quantity":1,"pizzaId":4,"ingredientId":2},
          {"id":48,"quantity":1,"pizzaId":4,"ingredientId":3},
          {"id":49,"quantity":0,"pizzaId":4,"ingredientId":4},
          {"id":50,"quantity":0,"pizzaId":4,"ingredientId":5},
          {"id":51,"quantity":0,"pizzaId":4,"ingredientId":6},
          {"id":52,"quantity":0,"pizzaId":4,"ingredientId":7},
          {"id":53,"quantity":0,"pizzaId":4,"ingredientId":8},
          {"id":54,"quantity":0,"pizzaId":4,"ingredientId":9},
          {"id":55,"quantity":0,"pizzaId":4,"ingredientId":10},
          {"id":56,"quantity":0,"pizzaId":4,"ingredientId":11},
          {"id":57,"quantity":0,"pizzaId":4,"ingredientId":12},
          {"id":58,"quantity":0,"pizzaId":4,"ingredientId":13},
          {"id":59,"quantity":0,"pizzaId":4,"ingredientId":14},
          {"id":60,"quantity":0,"pizzaId":4,"ingredientId":15}
        ]
      }
    ],
    "orderMisc": [
      {"id":7,"quantity":0,"orderId":3,"miscId":1},
      {"id":8,"quantity":0,"orderId":3,"miscId":2},
      {"id":9,"quantity":0,"orderId":3,"miscId":3}
    ],
    "orderId":1
  },
  {
    "phone":"+7 777 777 77 77",
    "userId":"3e8b850f-4fba-4e6d-ab85-4363846402eb",
    "addressId":1,
    "orderPizzas": [
      {
        "id":5,
        "name":"Test_2",
        "quantity":1,
        "sauceId":1,
        "doughId":2,
        "sizeId":1,
        "orderId":4,
        "ingredients": [
          {"id":61,"quantity":0,"pizzaId":5,"ingredientId":1},
          {"id":62,"quantity":0,"pizzaId":5,"ingredientId":2},
          {"id":63,"quantity":0,"pizzaId":5,"ingredientId":3},
          {"id":64,"quantity":1,"pizzaId":5,"ingredientId":4},
          {"id":65,"quantity":1,"pizzaId":5,"ingredientId":5},
          {"id":66,"quantity":1,"pizzaId":5,"ingredientId":6},
          {"id":67,"quantity":0,"pizzaId":5,"ingredientId":7},
          {"id":68,"quantity":0,"pizzaId":5,"ingredientId":8},
          {"id":69,"quantity":0,"pizzaId":5,"ingredientId":9},
          {"id":70,"quantity":0,"pizzaId":5,"ingredientId":10},
          {"id":71,"quantity":0,"pizzaId":5,"ingredientId":11},
          {"id":72,"quantity":0,"pizzaId":5,"ingredientId":12},
          {"id":73,"quantity":0,"pizzaId":5,"ingredientId":13},
          {"id":74,"quantity":0,"pizzaId":5,"ingredientId":14},
          {"id":75,"quantity":0,"pizzaId":5,"ingredientId":15}
        ]
      }
    ],
    "orderMisc": [
      {"id":10,"quantity":1,"orderId":4,"miscId":1},
      {"id":11,"quantity":1,"orderId":4,"miscId":2},
      {"id":12,"quantity":1,"orderId":4,"miscId":3}
    ],
    "orderAddress": {
      "id":1,
      "name":"ул.Street, д.building, кв.flat",
      "street":"Street",
      "building":"building",
      "flat":"flat",
      "comment":"",
      "userId":"3e8b850f-4fba-4e6d-ab85-4363846402eb"
    },
    "orderId":2  
  }
]

const createOrdersState = (store) => {
  store.commit('SET_ENTITY', {
    module: "Orders",
    entity: "orders",
    value: orders,
  });
};
const createMiscState = (store) => {
  store.commit('SET_ENTITY', {
    module: null,
    entity: "misc",
    value: misc
  });
};
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

describe('OrdersItem', () => {
  let wrapper;
  let dispatch;
  let store;
  let actions;

  const mocks = {
    $store: {
      dispatch,
    },
    $router: {
      push: jest.fn()
    },
  };

  const propsData = {
    orderId: 1,
  };

  const createComponent = (options) => {
    wrapper = mount(OrdersItem, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        deleteOrder: jest.fn(),
      },
      Cart: {
        resetCartState: jest.fn(),
        addPizzaToCart: jest.fn(),
        changeMiscQty: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is display "Самовывоз" if orders haven`t address', () => {
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.find('[data-test="oredr-address"]').html()).toContain("Самовывоз");
  });

  it ('is display address', () => {
    propsData.orderId = 2;
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.find('[data-test="oredr-address"]').html())
      .toContain(orders[1].orderAddress.name);
  });

  it ('is order number', () => {
    propsData.orderId = 2;
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.find('[data-test="order-number"]').html())
      .toContain(`Заказ #${ propsData.orderId }`);
  });

  it ('is deleted order', async () => {
    propsData.orderId = 2;
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    const btn = wrapper.find('[data-test="btn-dlt-order"]').find('button');
    await btn.trigger('click');
    expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
      expect.any(Object),
      { orderId: propsData.orderId }
    );
  });

  it ('is repeat order', async() => {
    propsData.orderId = 2;
    createPizza(store);
    createMiscState(store);
    createOrdersState(store);
    createComponent({ localVue, mocks, store, propsData});
    const btn = wrapper.find('[data-test="btn-rpt-order"]').find('button');
    await btn.trigger('click');
    expect(actions.Cart.resetCartState).toHaveBeenCalled();
    expect(actions.Cart.addPizzaToCart).toHaveBeenCalled();
    expect(actions.Cart.changeMiscQty).toHaveBeenCalled();
  });
});