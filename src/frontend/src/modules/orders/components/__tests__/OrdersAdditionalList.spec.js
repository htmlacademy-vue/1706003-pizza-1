import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import misc from '@/static/misc';
import OrdersAdditionalList from '@/modules/orders/components/OrdersAdditionalList';


const localVue = createLocalVue();
localVue.use(Vuex);

const miscDataState = misc;
miscDataState.forEach(
  (item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];}
);

const createMiscState = (store) => {
  store.commit('SET_ENTITY', {
    module: null,
    entity: "misc",
    value: misc
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
    misc: [
      {
        miscId: 1,
        quantity: 1,
      },
      {
        miscId: 2,
        quantity: 3,
      },
      {
        miscId: 3,
        quantity: 3,
      }
    ],
  };

  const createComponent = (options) => {
    wrapper = mount(OrdersAdditionalList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createMiscState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is display order items', () => {
    createMiscState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.findAll('[data-test="add-order-item"]').length)
    .toBe(propsData.misc.length);
  });
});