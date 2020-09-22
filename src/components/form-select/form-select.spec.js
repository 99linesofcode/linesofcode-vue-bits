import { shallowMount } from '@vue/test-utils';

import FormSelect from './form-select';

const optionsArray = [
    {
        value: '2020-01-01',
        text: 'January 1st, 2020'
    },
    {
        value: '2020-01-02',
        text: 'January 2nd, 2020'
    }
];

const wrapperFactory = propsData => {
    return shallowMount(FormSelect, {
        propsData: {
            name: 'delivery_date',
            value: '2020-01-02',
            options: optionsArray,
            ...propsData
        }
    });
};

describe('FormSelect.vue', () => {
    it('matches the previously stored snapshot', () => {
        const wrapper = wrapperFactory();

        expect(wrapper).toMatchSnapshot();

        wrapper.destroy();
    });

    describe('when initialized with incorrect props', () => {
        it('logs an error when name is falsy', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ name: null });

            expect(spy).toHaveBeenCalled();

            wrapper.destroy();
            spy.mockRestore();
        });

        it('logs an error when options is not an array of objects with text and value properties', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({
                options: [
                    {
                        alt: 'property',
                        description: ''
                    }
                ]
            });

            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
            wrapper.destroy();
        })
    });

    describe('name prop', () => {
        it('accepts a string', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ value: '' });

            expect(spy).not.toHaveBeenCalled();

            spy.mockRestore();
            wrapper.destroy();
        });

        it('accepts an array', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ value: [] });

            expect(spy).not.toHaveBeenCalled();

            spy.mockRestore();
            wrapper.destroy();
        });
    });

    describe('options prop', () => {
        it('accepts an array of objects with value and text properties', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory();

            expect(spy).not.toHaveBeenCalled();
            expect(wrapper.vm.options[0]).toHaveProperty('value');
            expect(wrapper.vm.options[0]).toHaveProperty('text');

            spy.mockRestore();
            wrapper.destroy();
        });

        it('maps the options property to select options', () => {
            const wrapper = wrapperFactory();
            const options = wrapper.findAll('option');

            expect(options.at(0).element.value).toBe(optionsArray[0].value);
            expect(options.at(0).text()).toBe(optionsArray[0].text);

            expect(options.at(1).element.value).toBe(optionsArray[1].value);
            expect(options.at(1).text()).toBe(optionsArray[1].text);

            wrapper.destroy();
        });
    })

    describe('when a selection is made', () => {
        describe('and multiple is falsy', () => {
            it('selects a single option', async () => {
                const wrapper = wrapperFactory();

                expect(wrapper.find('option:checked').element.value).toBe(optionsArray[1].value);

                await wrapper
                    .findAll('option')
                    .at(0)
                    .setSelected();

                expect(wrapper.find('option:checked').element.value).toBe(optionsArray[0].value);

                wrapper.destroy();
            });
        });
        describe('and multiple is truthy', () => {
            it('selects a multiple options', async () => {
                const wrapper = wrapperFactory({ multiple: true });

                await wrapper
                    .findAll('option')
                    .at(0)
                    .setSelected();

                const selectedOptions = Array.from(wrapper.find('select').element.selectedOptions, o => o.value);
                expect(selectedOptions).toEqual([optionsArray[0].value, optionsArray[1].value]);

                wrapper.destroy();
            });
        });

        it('emits a change event', async () => {
            const wrapper = wrapperFactory();

            await wrapper
                .findAll('option')
                .at(0)
                .setSelected();

            expect(wrapper.emitted('change').length).toBe(1);

            wrapper.destroy();
        });
    })

    describe('when receiving attribute bindings that are not recognised as props', () => {
        it('binds them to the select field', () => {
            const wrapper = wrapperFactory({ multiple: true, required: true });
            const select = wrapper.find('select');

            expect(wrapper.vm.multiple).toBeUndefined();
            expect(wrapper.vm.required).toBeUndefined();

            expect(select.element.multiple).toBe(wrapper.vm.$attrs.multiple);
            expect(select.element.required).toBe(wrapper.vm.$attrs.required);

            wrapper.destroy();
        });
    })

});
