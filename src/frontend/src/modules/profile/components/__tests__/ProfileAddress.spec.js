import { mount } from '@vue/test-utils';
import ProfileAddress from '@/modules/profile/components/ProfileAddress';

describe('ProfileAddress', () => {
  let wrapper;
  const propsData = {
    title: 'TestTitle',
    address: 'TestAddress',
    comment: 'TestComment',
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is render test title', () => {
    createComponent({ propsData });
    const title = wrapper.find('[data-test="title"]');
    expect(title.text()).toContain(propsData.title);
  });

  it ('is render test address', () => {
    createComponent({ propsData });
    const address = wrapper.find('[data-test="address"]');
    expect(address.text()).toContain(propsData.address);
  });

  it ('is render test comment', () => {
    createComponent({ propsData });
    const comment = wrapper.find('[data-test="comment"]');
    expect(comment.text()).toContain(propsData.comment);
  });

  it ('is changed user address', async () => {
    createComponent({ propsData });
    const btnChangeAddress = wrapper.find('[data-test="dtn-change-address"]');
    await btnChangeAddress.trigger('click');

    expect(wrapper.emitted().changeAddress).toBeTruthy()
  });
});