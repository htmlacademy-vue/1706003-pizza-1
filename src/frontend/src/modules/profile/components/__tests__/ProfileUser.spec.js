import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';
import ProfileUser from '@/modules/profile/components/ProfileUser';

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
};

describe('ProfileUser', () => {
  let wrapper;
  let dispatch;
  let store;

  const mocks = {
    $store: {
      dispatch,
    },
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileUser, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered img with atributs', () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, });
    const userAvatar = wrapper.find('[data-test="user-avatar"]');

    expect(userAvatar.attributes('alt'))
    .toEqual('Вася Пупкин');
    expect(userAvatar.attributes('src'))
    .toEqual('/public/img/users/user.jpg');
    expect(userAvatar.attributes('srcset'))
    .toEqual('/public/img/users/user@2x.jpg');

  });
});