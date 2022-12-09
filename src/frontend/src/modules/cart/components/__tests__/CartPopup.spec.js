import { mount } from '@vue/test-utils';
import CartPopup from '@/modules/cart/components/CartPopup';

describe('CartPopup', () => {

  let wrapper;
  const createComponent = options => {
    wrapper = mount(CartPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is close popup on thx button', async () => {
    createComponent();
    const bntClose = wrapper.find('[data-test="btn-thx"]').find('button');
    await bntClose.trigger('click');
    expect(wrapper.emitted().closePopup).toBeTruthy();
  });

  it ('is close popup', async () => {
    createComponent();
    const bntClose = wrapper.find('[data-test="btn-close"]').find('div');
    await bntClose.trigger('click');
    expect(wrapper.emitted().closePopup).toBeTruthy();
  });
});