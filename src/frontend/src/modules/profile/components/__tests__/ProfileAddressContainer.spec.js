import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import ProfileAddressContainer from '@/modules/profile/components/ProfileAddressContainer';

const localVue = createLocalVue();
localVue.use(Vuex);

const addresses = [
  {
    addressId: 1,
    name: "string",
    street: "string",
    building: "string",
    flat: "string",
    comment: "string",
    userId: "string"
  }
];

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

describe('ProfileAddress', () => {
  let wrapper;
  let login;
  let store;
  let dispatch;

  const propsData = {
    title: 'Test_Address',
    addressId: 1,
  };

  const methods = {
    login
  };

  const mocks = {
    $store: {
      dispatch
    },
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressContainer, options);
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
    createComponent({ propsData, mocks, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is render profile address form', () => {
    authenticateUser(store);
    createComponent({ propsData, mocks, store, data() {
      return {
          isChanging: true,
        }
      }
    });
    const addressForm = wrapper.find('[data-test="profile-address-form"]');
    expect(addressForm.exists()).toBeTruthy();
  });

  it ('is render profile address form', () => {
    authenticateUser(store);
    createComponent({ propsData, mocks, store, data() {
      return {
          isChanging: false,
        }
      }
    });
    const address = wrapper.find('[data-test="profile-address"]');
    expect(address.exists()).toBeTruthy();
  });

});