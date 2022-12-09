import { shallowMount } from '@vue/test-utils';
import AppLogo from '@/common/components/AppLogo';

describe('AppLogo', () => {
  const propsData = { width: 90, height: 40 };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLogo, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('logo width is props width', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('width')).toBe(`${propsData.width}`);
  });

  it('logo height is props height', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('height')).toBe(`${propsData.height}`);
  });
});
