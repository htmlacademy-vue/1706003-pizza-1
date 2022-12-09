import { shallowMount } from '@vue/test-utils';
import AppTitle from '@/common/components/AppTitle';

describe('AppButton', () => {
  const slots = { default: 'content' };
  const propsData = { modifier: ['big'] };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppTitle, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it('title class is title', () => {
    createComponent();
    expect(wrapper.attributes('class')).toBe('title');
  });

  it('button type is submit', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('class')).toBe(`title title--${propsData.modifier}`);
  });
});
