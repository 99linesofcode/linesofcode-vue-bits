import { shallowMount } from '@vue/test-utils';

import FormFile from './form-file';

const wrapperFactory = propsData => {
    return shallowMount(FormFile, {
        propsData: {
            placeholder: 'Select a file',
            name: 'file',
            ...propsData
        }
    });
};

const files = [
    new File(['foo, bar'], 'sample.csv', {
        type: 'text/csv',
        lastModified: Date.now()
    })
];

const mockFileSelection = {
    type: 'input',
    target: {
        files
    },
    preventDefault: () => {}
};

const mockDataTransfer = {
    type: 'drop',
    dataTransfer: {
        files
    },
    preventDefault: () => {}
};

describe('FormFile.vue', () => {
    it('matches the previously stored snapshot', () => {
        const wrapper = wrapperFactory();

        expect(wrapper).toMatchSnapshot();

        wrapper.destroy();
    });

    describe('when initialized with incorrect props', () => {
        it('logs an error when name is null', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ name: null });

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
            wrapper.destroy();
        });
    });

    describe('name prop', () => {
        it('accepts a string', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory();

            expect(spy).not.toHaveBeenCalled();

            spy.mockRestore();
            wrapper.destroy();
        });
    });

    describe('placeholder prop', () => {
        it("defaults to 'Select or drop a file onto this field..'", () => {
            const wrapper = wrapperFactory({ placeholder: undefined });

            expect(wrapper.find('label').text()).toBe('Select or drop a file onto this field..');

            wrapper.destroy();
        });

        it('binds to the label text', async () => {
            const wrapper = wrapperFactory();

            expect(wrapper.find('label').text()).toBe(wrapper.vm.placeholder);

            wrapper.destroy();
        });
    });

    describe('when selecting a file', () => {
        describe('and file selection is cancelled', () => {
            it('defaults back to the placeholder value', async () => {
                const wrapper = wrapperFactory();

                await wrapper.setData({ selection: [] });

                expect(wrapper.find('label').text()).toBe(wrapper.vm.placeholder);

                wrapper.destroy();
            });
        });

        it('displays the comma separated filenames in the label element', async () => {
            const wrapper = wrapperFactory();

            await wrapper.vm.onInput(mockFileSelection);

            expect(wrapper.find('label').text()).toBe(mockFileSelection.target.files.map(f => f.name).join(', '));

            wrapper.destroy();
        });

        it('emits an input event', async () => {
            const wrapper = wrapperFactory();

            await wrapper.find('input').trigger('input');

            expect(wrapper.emitted('input').length).toBe(1);

            wrapper.destroy();
        });
    });

    describe("when drag 'n' dropping a file", () => {
        describe('and entering the dropzone', () => {
            it('sets isDragging to true', async () => {
                const wrapper = wrapperFactory();
                const label = wrapper.find('label');

                await label.trigger('dragenter');

                expect(label.classes()).toContain('isDragging');

                wrapper.destroy();
            });
        });

        describe('and leaving the dropzone', () => {
            it('sets isDragging to false', async () => {
                const wrapper = wrapperFactory();
                const label = wrapper.find('label');

                await label.trigger('dragleave');

                expect(label.classes()).not.toContain('isDragging');

                wrapper.destroy();
            });
        });

        describe('and dropping the file', () => {
            it('sets isDragging to false', async () => {
                const wrapper = wrapperFactory();
                const label = wrapper.find('label');

                await wrapper.vm.onDrop(mockDataTransfer);

                expect(label.classes()).not.toContain('isDragging');

                wrapper.destroy();
            });

            it('displays the comma separated filenames in the label element', async () => {
                const wrapper = wrapperFactory();

                await wrapper.vm.onDrop(mockDataTransfer);

                expect(wrapper.find('label').text()).toBe(mockFileSelection.target.files.map(f => f.name).join(', '));

                wrapper.destroy();
            });

            it('emits an input event', async () => {
                const wrapper = wrapperFactory();

                await wrapper.vm.onDrop(mockDataTransfer);

                expect(wrapper.emitted('input').length).toBe(1);

                wrapper.destroy();
            });

            it('does not emit a dragover event to prevent the browser from downloading the file', async () => {
                const spy = jest.spyOn(mockDataTransfer, 'preventDefault');
                const wrapper = wrapperFactory();

                await wrapper.vm.onDragover(mockDataTransfer);

                expect(spy).toHaveBeenCalled();

                spy.mockRestore();
                wrapper.destroy();
            });

            it('does not emit a drop event to prevent the browser from downloading the file', async () => {
                const spy = jest.spyOn(mockDataTransfer, 'preventDefault');
                const wrapper = wrapperFactory();

                await wrapper.vm.onDrop(mockDataTransfer);

                expect(spy).toHaveBeenCalled();

                spy.mockRestore();
                wrapper.destroy();
            });
        });
    });

    describe('when receiving attribute bindings that are not recognised as props', () => {
        it('binds them to the input field', () => {
            const wrapper = wrapperFactory({ multiple: true, required: true });
            const input = wrapper.find('input');

            expect(wrapper.vm.multiple).toBeUndefined();
            expect(wrapper.vm.required).toBeUndefined();

            expect(input.element.multiple).toBe(wrapper.vm.$attrs.multiple);
            expect(input.element.required).toBe(wrapper.vm.$attrs.required);

            wrapper.destroy();
        });
    });
});
