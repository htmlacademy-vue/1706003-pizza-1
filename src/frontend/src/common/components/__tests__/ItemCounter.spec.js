import { shallowMount } from '@vue/test-utils';
import ItemCounter from '@/common/components/ItemCounter';

describe('AppButton', () => {
  const propsData = {
    min: 0,
    max: 5,
    counter: 2,
    buttonColor: "orange"
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });


  it('raises the changeCounter event on click minus and transmits new counter', () => {
    createComponent({ propsData });

    wrapper.find('.counter__button--minus').trigger('click');

    expect(wrapper.emitted().changeCounter).toBeTruthy();
    expect(wrapper.emitted().changeCounter[0]).toEqual([propsData.counter - 1]);
  });

  it('raises the changeCounter event on click plus and transmits new counter', () => {
    createComponent({ propsData });

    wrapper.find('.counter__button--plus').trigger('click');

    expect(wrapper.emitted().changeCounter).toBeTruthy();
    expect(wrapper.emitted().changeCounter[0]).toEqual([propsData.counter + 1]);
  });

  it('disabled button minus with counter min', () => {
    const propsData = {
      min: 0,
      max: 5,
      counter: 0,
      buttonColor: "orange"
    };
    createComponent({ propsData });
    
    expect(wrapper.find('.counter__button--minus').attributes('disabled')).toBe('disabled')
    
  }); 

  it('disabled button plus with counter max', () => {
    const propsData = {
      min: 0,
      max: 5,
      counter: 5,
      buttonColor: "orange"
    };
    createComponent({ propsData });
    
    expect(wrapper.find('.counter__button--plus').attributes('disabled')).toBe('disabled')
    
  }); 


  it('button class has modifaer', () => {
    createComponent({ propsData });
    expect(wrapper.findComponent('.counter__button--plus').attributes('class')).toContain(`counter__button--${propsData.buttonColor}`);
  });
});
