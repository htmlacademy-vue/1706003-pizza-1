import { mount } from '@vue/test-utils';
import { formatCurrency } from "@/common/helpers.js";
import CartFooter from '@/modules/cart/components/CartFooter';


describe('CartFooter', () => {
  let wrapper;

  const propsData = {
    orderCost: 0,
  };

  const stubs = ['router-link'];

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is button disabled with 0 cost', () => {
    createComponent({ propsData, stubs });
    expect(wrapper.find('[data-test="btn-place-an-order"]').attributes('disabled'))
      .toBeTruthy();
  });

  it ('is button not disabled', () => {
    propsData.orderCost = 100;
    createComponent({ propsData, stubs });
    expect(wrapper.find('[data-test="btn-place-an-order"]').attributes('disabled'))
      .toBeFalsy();
  });

  it ('is button not disabled', () => {
    propsData.orderCost = 100;
    createComponent({ propsData, stubs });
    expect(wrapper.find('[data-test="cart-cost"]').text())
      .toBe(`Итого: ${ formatCurrency(propsData.orderCost) }`);
  });
});