import { shallowMount } from '@vue/test-utils';
import FileModal from '@/components/FileModal.vue';
import mockedData from '../formatted-data.json';
import sinon from 'sinon';

describe('File Modal', () => {
  let wrapper;
  beforeEach(() => {
    const data = () => {
      return {
        activeIndex: 0,
        breadcrumbs: [
          {
            name: 'Torstraße 145, 39481 Nürnberg',
            children: mockedData
          }
        ],
        localSelectedState: {}
      };
    };

    const propsData = {
      show: true,
      fileStructure: mockedData,
      selectedFiles: {}
    };

    wrapper = shallowMount(FileModal, {
      propsData,
      data
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  const selectFolder = async () => {
    const [id, { name, children }] = Object.entries(mockedData)[0];
    await wrapper.setData({
      activeIndex: 1,
      breadcrumbs: [
        {
          name: 'Torstraße 145, 39481 Nürnberg',
          children: mockedData
        },
        { id, name, children }
      ]
    });
    return { id, name, children };
  };

  it('has a button with the text `Select files`', () => {
    const button = wrapper.findAll('button:not(.icon)');
    expect(button.length).toEqual(1);
    expect(button.at(0).text()).toBe('Select files');
  });

  it('clicking button closes the modal', async () => {
    const button = wrapper.find('button:not(.icon)');
    await button.trigger('click');
    expect(wrapper.classes()).not.toContain('show');
  });

  it('renders the default modal title', async () => {
    const modalTitle = wrapper.find('.title');
    expect(modalTitle.text()).toEqual('Torstraße 145, 39481 Nürnberg');
  });

  it('hides the back button on root folder', async () => {
    const modalTitle = wrapper.find('.icon');
    expect(modalTitle.classes()).toContain('d-none');
  });

  it('renders the children of the current folder you are on', async () => {
    const { children } = await selectFolder();
    const listItems = wrapper.findAll('.item');
    const firstItem = listItems.at(0);
    const childrenArray = Object.values(children);
    expect(listItems.length).toEqual(childrenArray.length);
    expect(firstItem.text()).toContain(childrenArray[0].name);
  });

  it('renders the title of current folder', async () => {
    const { name } = await selectFolder();
    const modalTitle = wrapper.find('.title');
    expect(modalTitle.text()).toEqual(name);
  });

  it('shows the back button when not in the root folder', async () => {
    await selectFolder();
    const modalTitle = wrapper.find('.icon');
    expect(modalTitle.classes()).not.toContain('d-none');
  });
});
