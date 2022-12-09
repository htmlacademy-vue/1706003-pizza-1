import { mount } from '@vue/test-utils';
import ProfileAddressForm from '@/modules/profile/ProfileAddressForm';

describe('ProfileAddress', () => {
  let wrapper;
  const props = {
    newAddress: false, 
    title: "Address",
  };
  const address = {
    name: "name",
    street: "steet",
    building: "building",
    flat: "flat",
    comment: "comment",
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressForm, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is display delete btn', () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    const btnDlt = wrapper.find('[data-test="btn-delete-address"]');
    expect(btnDlt.exists()).toBeTruthy();
  });

  it ('is delete address user', async () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    const btnDlt = wrapper.find('[data-test="btn-delete-address"]');
    await btnDlt.trigger('click');
    expect(wrapper.emitted().delAddressInfo).toBeTruthy()
  });

  it ('is title in header', () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    expect(wrapper.find('[data-test="address-header"]').html()).toContain(propsData.title);
  });

  it ('is props data in inputs', () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    expect(wrapper.find('[data-test="input-address-name"]').element.value)
    .toBe(address.name);
    expect(wrapper.find('[data-test="input-address-street"]').element.value)
    .toBe(address.street);
    expect(wrapper.find('[data-test="input-address-building"]').element.value)
    .toBe(propsData.address.building);
    expect(wrapper.find('[data-test="input-address-flat"]').element.value)
    .toBe(address.flat);
    expect(wrapper.find('[data-test="input-address-comment"]').element.value)
    .toBe(address.comment);
  });

  it ('is set address info on submit', async () => {
    const propsData = {
      ...props,
      address,
    };
    createComponent({ propsData });
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().setAddressInfo[0]).toStrictEqual([address])
  });

  it ('is doen`t display delete btn', () => {
    const propsData = {
      ...props,
      newAddress: true,
    };
    createComponent({ propsData });
    const btnDlt = wrapper.find('[data-test="btn-delete-address"]');
    expect(btnDlt.exists()).toBeFalsy();
  });

});