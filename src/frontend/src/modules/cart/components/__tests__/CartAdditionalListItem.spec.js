import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import miscData from '@/static/misc';
import CartAdditionalListItem from '@/modules/cart/components/CartAdditionalListItem';
import { formatCurrency } from "@/common/helpers.js";


const localVue = createLocalVue();
localVue.use(Vuex);

const misc = miscData;
misc.forEach((item) => {delete Object.assign(item, {['miscId']: item['id'] })['id'];});

const createMisc = (store) => {
  store.commit('SET_ENTITY', {
    module: "Cart",
    entity: 'misc',
    value: misc.map((misc) => ({
      miscId: misc.miscId,
      quantity: 1,
    })),
  });
}

describe('CartAdditionalListItem', () => {
  let wrapper;
  let store;

  const propsData = {
    miscId: miscData[0].miscId,
    name: miscData[0].name,
    image: miscData[0].image,
    price: miscData[0].price,
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalListItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createMisc(store);
    createComponent({ localVue, store, propsData});
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is changing misc qty - 1', async () => {
    createMisc(store);
    createComponent({ localVue, store, propsData});
    const counter = wrapper.find('[data-test="misc-counter"]');

    const minus = counter.find('.counter__button--minus');
    await minus.trigger('click');
    expect(wrapper.emitted().changeQty[0][0]).toBe(0);
  });

  it ('is changing misc qty + 1', async () => {
    createMisc(store);
    createComponent({ localVue, store, propsData});
    const counter = wrapper.find('[data-test="misc-counter"]');

    const plus = counter.find('.counter__button--plus');
    await plus.trigger('click');
    expect(wrapper.emitted().changeQty[0][0]).toBe(2);
  });

  it ('is display formatted price', async () => {
    createMisc(store);
    createComponent({ localVue, store, propsData});
    const price = wrapper.find('[data-test="pizza-misc-price"]').find('b')
    expect(price.text()).toContain(`× ${formatCurrency(propsData.price)}`);
  });
  
});