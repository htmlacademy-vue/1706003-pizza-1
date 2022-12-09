import { shallowMount } from '@vue/test-utils';
import AppProduct from '@/common/components/AppProduct';

describe('AppButton', () => {
  const propsData = {
    name: "Name",
    size: "Size",
    dough: "Dough",
    sauce: "Sauce",
    ingredients: "Ingredients"
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppProduct, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('alt img product is name', () => {
    createComponent({ propsData });
    expect(wrapper.find('.product__img').attributes('alt')).toBe(propsData.name)
  });

  it('renders out the props content', () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.name);
    expect(wrapper.html()).toContain(propsData.size);
    expect(wrapper.html()).toContain(propsData.dough);
    expect(wrapper.html()).toContain(propsData.sauce);
    expect(wrapper.html()).toContain(propsData.ingredients);
  });


});
