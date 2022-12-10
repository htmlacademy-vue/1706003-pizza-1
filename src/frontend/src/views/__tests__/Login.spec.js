import { mount, createLocalVue } from '@vue/test-utils';
import $validator from '@/common/mixins/validator';
import Login from '@/views/Index/^Login.vue';
import AppButton from '@/common/components/AppButton';
import AppClose from '@/common/components/AppClose';
import AppTitle from "@/common/components/AppTitle.vue";

const localVue = createLocalVue();
localVue.component('AppButton', AppButton);
localVue.component('AppClose', AppClose);
localVue.component('AppTitle', AppTitle);

describe('Login', () => {
  let routerGo;
  let dispatch;
  let login;

  const methods = {
    login
  };

  const mocks = {
    $router: {
      go: routerGo
    },
    $store: {
      dispatch
    },
    $validator
  };

  const stubs = [
    'router-link'
  ];

  let wrapper;
  const createComponent = options => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerGo = jest.fn();
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.go = routerGo;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('redirects to prev page on close button click', async () => {
    createComponent({ localVue, mocks, stubs });
    const closeBtn = wrapper.find('[data-test="close-button"]');
    await closeBtn.trigger('click');
    expect(routerGo).toHaveBeenCalledWith(-1);
  });

  it('validation mixin has been called on form submit', async () => {
    createComponent({ localVue, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, '$validateFields');
    await wrapper.find('form').trigger('submit');
    expect(spyValidateFields).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it(
    'calls login and redirects to prev page if credentials are valid',
    async () => {
      createComponent({ localVue, mocks, stubs });
      const emailInput = wrapper.find('[data-test="email-input"]');
      const passInput = wrapper.find('[data-test="password-input"]');

      emailInput.element.value = 'user@example.com';
      await emailInput.trigger('input');
      passInput.element.value = 'user@example.com';
      await passInput.trigger('input');

      await wrapper.find('form').trigger('submit');
      expect(dispatch).toHaveBeenCalled();
      expect(routerGo).toHaveBeenCalledWith(-1);
    });
});