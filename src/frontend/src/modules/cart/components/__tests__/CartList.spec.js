import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import pizza from '@/static/pizza';
import CartList from "@/modules/cart/components/CartList.vue";

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

const pizzas = [
  {
    name: "тест_1",
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
  },
  {
    name: "тест_2",
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
]

const pizzasState = (store) => {
  store.commit('SET_ENTITY', {
    module: 'Cart',
    entity: 'pizzas',
    value: pizzas,
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


describe('CartList', () => {
  let actions;
  let store;
  let wrapper;
  let routerPush;

  const createComponent = options => {
    wrapper = mount(CartList, options);
  };

  const mocks = {
    $router: {
      push: routerPush
    },
  };

  beforeEach(() => {
    routerPush = jest.fn();
    actions = {
      Cart: {
        changePizzaQty: jest.fn(),
        deletePizzaFromCart: jest.fn(),
      },
      Builder: {
        setBuilderState: jest.fn(),
      }
    };
    mocks.$router.push = routerPush;
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createPizza(store)
    pizzasState(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered all items in list', () => {
    createPizza(store)
    pizzasState(store);
    createComponent({ localVue, store });
    expect(wrapper.findAll('[data-test="cart-list-item"]').length).toBe(pizzas.length);
  });

  it ('is changed qty item', () => {
    createPizza(store)
    pizzasState(store);
    builderInitState(store);
    createComponent({ localVue, store });
    const item = wrapper.findAll('[data-test="cart-list-item"]').at(0);
    item.vm.$emit("changeQty", 2);
    expect(actions.Cart.changePizzaQty).toHaveBeenCalledWith(
      expect.any(Object),
      { index: 0, quantity: 2}
    );
  });

  it ('is changed item and redirect to builder', () => {
    createPizza(store)
    pizzasState(store);
    builderInitState(store);
    createComponent({ localVue, store, mocks });
    const item = wrapper.findAll('[data-test="cart-list-item"]').at(0);
    item.vm.$emit("changePizza");
    expect(actions.Builder.setBuilderState).toHaveBeenCalledWith(
      expect.any(Object),
      { state: pizzas[0] }
    );
    expect(actions.Cart.deletePizzaFromCart).toHaveBeenCalledWith(
      expect.any(Object),
      { index: 0 }
    );
    expect(routerPush).toHaveBeenCalledWith("/");
  });
});