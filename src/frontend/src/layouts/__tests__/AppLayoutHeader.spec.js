import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import { authenticateUser } from '@/common/helpers';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutHeader', () => {
  const directives = {
    clickOutside: jest.fn()
  };

  const mocks = {
    $router: {
      push: jest.fn()
    },
  };

  const stubs = ['router-link'];

  let actions;
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn()
      }
    };
    directives.clickOutside = jest.fn();
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders login', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const login = wrapper.find('.header__user picture');
    expect(login.exists()).toBeTruthy();
  });

  it ('redirects to login on click', async () => {
    createComponent({ localVue, store, mocks, stubs });
    const loginBtn = wrapper.find('.header__login');
    await loginBtn.trigger('click');
    expect(loginBtn.exists()).toBeTruthy();
  });

  it ('redirects to start page on click', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const logoutBtn = wrapper.find('.header__logout');
    await logoutBtn.trigger('click');
    expect(logoutBtn.exists()).toBeTruthy();
  });

  it ('redirects to cart page on click', async () => {
    createComponent({ localVue, store, mocks, stubs });
    const cartBtn = wrapper.find('.header__cart');
    await cartBtn.trigger('click');
    expect(cartBtn.exists()).toBeTruthy();
  });

});