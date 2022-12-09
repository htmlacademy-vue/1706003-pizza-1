import { shallowMount } from '@vue/test-utils';
import AppClose from '@/common/components/AppClose';

describe('AppClose', () => {
  const propsData = { modifier: 'white' };
  const listeners = { click: null };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppClose, options);
  }

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('raises the click event on click', () => {
    createComponent({ listeners });
    wrapper.find('.close').trigger('click');
    expect(listeners.click).toHaveBeenCalled();
  });

  it('adds a css modifier', () => {
    createComponent({propsData});
    expect(wrapper.attributes('class')).toBe(`close close--${propsData.modifier}`);
  });
});
