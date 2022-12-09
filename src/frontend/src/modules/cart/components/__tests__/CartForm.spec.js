import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import CartForm from '@/modules/cart/components/CartForm';


const localVue = createLocalVue();
localVue.use(Vuex);

const authStore = (store) => {
  store.commit('SET_ENTITY', {
    module: "Auth",
    entity: "addresses",
    value: [],
  });
};

const defautltAdresses = [
  {
    id: "default_0",
    name: "Получу сам",
  },
  {
    id: "default_1",
    name: "Новый адрес",
    street: "",
    building: "",
    flat: "",
    comment: "",
  },
];

describe('CartForm', () => {
  let wrapper;
  let store;


  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authStore(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is doesn`t display address', async () => {
    authStore(store);
    createComponent({ localVue, store });
    await wrapper.setData({ 
      phone: "",
      selectedAddress: defautltAdresses[0],
    });
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeFalsy();
  });

  it ('is does display address', async () => {
    authStore(store);
    createComponent({ localVue, store });
    await wrapper.setData({ 
      phone: "",
      selectedAddress: defautltAdresses[1],
    });
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeTruthy();
  });

  it ('is does display address', async () => {
    authStore(store);
    createComponent({ localVue, store });
    await wrapper.setData({ 
      phone: "",
      selectedAddress: defautltAdresses[1],
    });
    const phone = wrapper.find('[data-test="cart-phone"]');
    const street = wrapper.find('[data-test="cart-street"]');
    const building = wrapper.find('[data-test="cart-building"]');
    const flat = wrapper.find('[data-test="cart-flat"]');

    await phone.setValue('+7 777 777 77 77');
    await street.setValue('street');
    await building.setValue('building');
    await flat.setValue('flat');

    expect(wrapper.vm.phone).toBe('+7 777 777 77 77');
    expect(wrapper.vm.selectedAddress).toStrictEqual({
      ...defautltAdresses[1],
      street: 'street',
      building: 'building',
      flat: 'flat',
      comment: "",
    })
  });
});