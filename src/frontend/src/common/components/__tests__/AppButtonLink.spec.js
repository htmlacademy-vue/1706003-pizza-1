import { shallowMount } from '@vue/test-utils';
import AppButtonLink from '@/common/components/AppButtonLink';

describe('AppButtonLink', () => {
  const slots = { default: 'content' };
  const propsData = { to: '/', modifier: ['secondary', 'transparent', 'arrow'] };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppButtonLink, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ propsData, slots, stubs: ['router-link']});
    expect(wrapper.html()).toContain(slots.default);
  });

  it('link class has modifier', () => {
    createComponent({ propsData, stubs: ['router-link']});
    expect(wrapper.attributes('class')).toBe('button button--border button--transparent button--arrow');
  });

  it('link has attribyte to', () => {
    createComponent({ propsData, stubs: ['router-link'] });
    expect(wrapper.attributes('to')).toBe(propsData.to);
  });
});
