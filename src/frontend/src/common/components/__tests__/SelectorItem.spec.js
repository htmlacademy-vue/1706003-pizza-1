import { shallowMount } from '@vue/test-utils';
import SelectorItem from '@/common/components/SelectorItem';

describe('AppButton', () => {
  const propsData = { ingredient: 'Ingredient' };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the props content', () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.ingredient);
  });
});
