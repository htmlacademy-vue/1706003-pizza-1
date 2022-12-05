import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import Profile from '@/views/Profile';

const localVue = createLocalVue();
localVue.use(Vuex);


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
    value: [],
  });
};

describe('Profile', () => {
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
    wrapper = mount(Profile, options);
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
    createComponent({ localVue, mocks, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders orders', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store });
    const userAdress = wrapper.findAll('[data-test="adress"]');
    expect(Array.from(userAdress).length).toEqual(orders.length);
  });

});