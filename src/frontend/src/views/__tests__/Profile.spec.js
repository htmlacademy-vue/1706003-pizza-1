import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import Profile from '@/views/Profile';

const localVue = createLocalVue();
localVue.use(Vuex);

const addresses =[
  {
    addressId: 0,
    name: "string",
    street: "string",
    building: "string",
    flat: "string",
    comment: "string",
    userId: "string"
  }
]

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
  store.commit('SET_ENTITY', {
    module: "Auth",
    entity: "addresses",
    value: addresses,
  });
};

describe('Profile', () => {
  let login;
  let actions;
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
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        setAddress: jest.fn(),
      },
    };
    login = jest.fn();
    methods.login = login;
    store = generateMockStore(actions);
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders addresses', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store });
    const userAddress = wrapper.findAll('[data-test="user-address"]');
    expect(Array.from(userAddress).length).toEqual(addresses.length);
  });

  it ('doesn\'t display add new address', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store  });
    expect(wrapper.find('[data-test="add-new-address"]').exists()).toBeFalsy();
  });

  it ('displays add new address', async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store  });

    const btnAddNewAddress = wrapper.find('[data-test="btn-add-new-address"]');
    await btnAddNewAddress.trigger('click');

    expect(wrapper.find('[data-test="add-new-address"]').exists()).toBeTruthy();
  });

  it ('set new address', async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store  });

    const btnAddNewAddress = wrapper.find('[data-test="btn-add-new-address"]');
    await btnAddNewAddress.trigger('click');

    const btnSetNewAddress = wrapper.find('[data-test="btn-set-new-address"]');
    btnSetNewAddress.vm.$emit('setAddressInfo', {
      name: "name",
      street: "street",
      building: "building",
      flat: "flat",
      comment: "comment"
    });

    expect(actions.Auth.setAddress)
    .toHaveBeenCalledWith(
      expect.any(Object), {
        name: "name",
        street: "street",
        building: "building",
        flat: "flat",
        comment: "comment"
      });
  }); 

});
