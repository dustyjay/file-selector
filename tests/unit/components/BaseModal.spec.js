import BaseModal from '@/components/BaseModal.vue';
import { shallowMount } from '@vue/test-utils';

describe('Base Modal', () => {
  let wrapper;
  beforeEach(() => {
    const propsData = {
      show: false
    };

    wrapper = shallowMount(BaseModal, {
      propsData
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should show if the show state is true', async () => {
    await wrapper.setProps({ show: true });
    expect(wrapper.classes()).toContain('show');
  });

  it('should have a close button', () => {
    const button = wrapper.find('button.icon');
    expect(button.exists()).toBeTruthy();
  });

  it('should close modal if button is clicked', async () => {
    const button = wrapper.find('button.icon');
    await button.trigger('click');
    expect(wrapper.classes()).not.toContain('show');
  });

  it('should close modal if user clicks out of modal', async () => {
    await wrapper.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).not.toContain('show');
  });
});
