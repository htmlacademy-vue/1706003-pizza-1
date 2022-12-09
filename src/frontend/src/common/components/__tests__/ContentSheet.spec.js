import { shallowMount } from '@vue/test-utils';
import ContentSheet from '@/common/components/ContentSheet';

describe('AppButton', () => {
  const slots = { default: 'content' };
  const propsData = { contentClasses: ['root', 'wrapper'] };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ContentSheet, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ propsData, slots });
    expect(wrapper.find('form').html()).toContain(slots.default);
  });

  it('form class contain classes of content', () => {
    createComponent({ propsData });
    expect(wrapper.find('form').attributes('class')).toContain(propsData.contentClasses.join(' '));
  });
});
