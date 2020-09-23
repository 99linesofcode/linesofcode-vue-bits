<template>
  <input
    v-bind="computedAttributes"
    v-on="computedListeners"
    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal"
  />
</template>

<script>
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

export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: type => supportedInputTypes.includes(type)
    },
    value: String
  },
  computed: {
    computedAttributes() {
      const { $attrs, name, type, value } = this;

      return {
        ...$attrs,
        name,
        type: supportedInputTypes.includes(type) ? type : 'text',
        value
      };
    },
    computedListeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      };
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>
