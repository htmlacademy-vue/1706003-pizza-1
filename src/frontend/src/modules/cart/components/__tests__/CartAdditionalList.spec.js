import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import miscData from '@/static/misc';
import CartAdditionalList from '@/modules/cart/components/CartAdditionalList';


const localVue = createLocalVue();
localVue.use(Vuex);

const misc = miscData;
misc.forEach((item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];});

const createIndexStore = (store) => {
  store.commit('SET_ENTITY', {
    module: null,
    entity: 'misc',
    value: misc,
  });
}

const createCartStore = (store) => {
  store.commit('SET_ENTITY', {
    module: "Cart",
    entity: 'misc',
    value: misc.map((misc) => ({
      miscId: misc.miscId,
      quantity: 1,
    })),
  });
}

describe('CartAdditionalList', () => {
  let wrapper;
  let store;
  let actions;


  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        changeMiscQty: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createIndexStore(store);
    createCartStore(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered all items in list', () => {
    createIndexStore(store);
    createCartStore(store);
    createComponent({ localVue, store });
    expect(wrapper.findAll('[data-test="cart-list-add-item"]').length).toBe(misc.length);
  });

  it ('is changed qty item', () => {
    createIndexStore(store);
    createCartStore(store);
    createComponent({ localVue, store });
    const item = wrapper.findAll('[data-test="cart-list-add-item"]').at(0);
    item.vm.$emit("changeQty");
    expect(actions.Cart.changeMiscQty).toHaveBeenCalled();
  });
  
});