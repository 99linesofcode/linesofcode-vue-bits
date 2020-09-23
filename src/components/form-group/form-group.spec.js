import { shallowMount } from '@vue/test-utils';

import FormGroup from './form-group';

const wrapperFactory = propsData => {
    return shallowMount(FormGroup, {
        propsData: {
            label: 'First name',
            name: 'first_name',
            error: 'First name is required.',
            ...propsData
        },
        slots: {
            default: '<div class="mock-slot"></div>'
        }
    });
};

describe('FormGroup.vue', () => {
    it('matches the previously stored snapshot', () => {
        const wrapper = wrapperFactory();

        expect(wrapper).toMatchSnapshot();

        wrapper.destroy();
    });

    describe('label prop', () => {
        it('renders a label element when truthy', () => {
            const wrapper = wrapperFactory();

            expect(wrapper.find('label').text()).toEqual(wrapper.vm.label);

            wrapper.destroy();
        });

        it('hides the label element when falsy', () => {
            const wrapper = wrapperFactory({ label: null });

            expect(wrapper.find('label').exists()).toBe(false);

            wrapper.destroy();
        });
    });

    describe('error prop', () => {
        it('renders an error message when truthy', () => {
            const wrapper = wrapperFactory();

            expect(wrapper.find('span').text()).toEqual(wrapper.vm.error);

            wrapper.destroy();
        });

        it('hides the error message when falsy', () => {
            const wrapper = wrapperFactory({ error: null });

            expect(wrapper.find('span').exists()).toBe(false);

            wrapper.destroy();
        });
    });

    describe('when passed child content', () => {
        it('renders as the default slot', () => {
            const wrapper = wrapperFactory();

            expect(wrapper.findAll('.mock-slot').length).toBe(1);

            wrapper.destroy();
        });
    });
});
