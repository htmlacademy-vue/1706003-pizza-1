import { shallowMount } from '@vue/test-utils';
import RadioButton from '@/common/components/RadioButton';

describe('AppButton', () => {
  const propsData = {
    value: 0,
    name: "Name",
    checked: true,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('set checked radio button', async () => {
    createComponent({ propsData });
    const radioInput = wrapper.find('input');
    radioInput.setChecked();
    expect(radioInput.element.checked).toBeTruthy();
  });

  it('input attributes is props data', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').attributes('name')).toBe(propsData.name);
    expect(wrapper.find('input').attributes('value')).toBe(`${propsData.value}`);
    expect(wrapper.find('input').element.checked).toBe(propsData.checked)
  });
});
