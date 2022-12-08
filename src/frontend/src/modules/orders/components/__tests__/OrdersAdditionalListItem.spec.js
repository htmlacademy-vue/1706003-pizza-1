import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import misc from '@/static/misc';
import { formatCurrency } from "@/common/helpers.js";
import OrdersAdditionalListItem from '@/modules/orders/components/OrdersAdditionalListItem';


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
    miscId: 1,
    quantity: 1,
  };

  const createComponent = (options) => {
    wrapper = mount(OrdersAdditionalListItem, options);
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

  it ('is display order item price', () => {
    const miscItemPrice = miscDataState
      .find((item) => item.miscId === propsData.miscId).price;
    createMiscState(store);
    createComponent({ localVue, mocks, store, propsData});
    expect(wrapper.find('[data-test="add-item-price"]').text())
    .toBe(`${propsData.quantity}x${formatCurrency(miscItemPrice)}`);
  });
});