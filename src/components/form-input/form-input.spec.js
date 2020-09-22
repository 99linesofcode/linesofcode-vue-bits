import { shallowMount } from '@vue/test-utils';

import FormInput from './form-input';

const supportedInputTypes = [
    'text',
    'password',
    'email',
    'number',
    'url',
    'tel',
    'search',
    'range',
    'color',
    'date',
    'time',
    'datetime-local',
    'month',
    'week'
];

const wrapperFactory = propsData => {
    return shallowMount(FormInput, {
        propsData: {
            type: 'text',
            name: 'first_name',
            value: 'Esther',
            ...propsData
        }
    });
};

describe('FormInput.vue', () => {
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

            wrapper.destroy();
            spy.mockRestore();
        });

        it('logs an error when type is not supported', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ type: 'radio' });

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

        it('binds and updates correctly', async () => {
            const wrapper = wrapperFactory();

            expect(wrapper.find('input').element.value).toBe(wrapper.vm.value);

            await wrapper.setValue('Jordy');

            expect(wrapper.find('input').element.value).toBe('Jordy');

            wrapper.destroy();
        });
    });

    describe('type prop', () => {
        it('defaults to type text when value is not supported', () => {
            const spy = jest.spyOn(global.console, 'error').mockImplementation();
            const wrapper = wrapperFactory({ type: 'radio' });

            expect(wrapper.find('input').element.type).toBe('text');

            spy.mockRestore();
            wrapper.destroy();
        });

        it.each(supportedInputTypes)('should support %s', inputType => {
            const wrapper = wrapperFactory({ type: inputType });

            expect(wrapper.find('input').element.type).toBe(inputType);

            wrapper.destroy();
        });
    });

    describe('when input is entered', () => {
        it('emits an input event', () => {
            const wrapper = wrapperFactory();

            wrapper.find('input').trigger('input');

            expect(wrapper.emitted('input').length).toBe(1);

            wrapper.destroy();
        });
    });

    describe('when receiving attribute bindings that are not recognised as props', () => {
        it('binds them to the input field', () => {
            const wrapper = wrapperFactory({ id: 'firstName', required: true });
            const input = wrapper.find('input');

            expect(wrapper.vm.id).toBeUndefined();
            expect(wrapper.vm.required).toBeUndefined();

            expect(input.element.id).toBe(wrapper.vm.$attrs.id);
            expect(input.element.required).toBe(wrapper.vm.$attrs.required);

            wrapper.destroy();
        });
    });
});
