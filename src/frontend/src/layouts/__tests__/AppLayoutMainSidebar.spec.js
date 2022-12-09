import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutMain', () => {
  const mocks = {
    $route: {
      name: 'test'
    }
  };

  const stubs = ['router-link'];

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLayoutMainSidebar, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('is rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.html()).toBeTruthy();
  });

  it ('renders sidebar', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const sidebar = wrapper.find('.sidebar');
    expect(sidebar.exists()).toBeTruthy();
  });
});