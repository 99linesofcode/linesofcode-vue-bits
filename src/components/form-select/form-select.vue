<template>
  <select class="form-select" v-bind="computedAttributes" v-on="computedListeners">
    <option v-for="o in options" :key="o.text" :value="o.value" :selected="selectedOption(o)">
      {{ o.text }}
    </option>
  </select>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      validator: options => {
        return options.every(o => o.hasOwnProperty('value') && o.hasOwnProperty('text'));
      }
    },
    value: {
      type: [String, Array]
    }
  },
  computed: {
    computedAttributes() {
      const { $attrs, name } = this;

      return {
        ...$attrs,
        name
      };
    },
    computedListeners() {
      return {
        ...this.$listeners,
        change: this.onChange
      };
    }
  },
  methods: {
    selectedOption(option) {
      if (option.value === null) return;

      if (this.$attrs.multiple) {
        return this.value.includes(option.value);
      }

      return this.value == option.value;
    },
    onChange(event) {
      const selectedValues = Array.from(event.target.selectedOptions, o => o.value);
      this.$emit('change', this.$attrs.multiple ? selectedValues : selectedValues[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-select {
  @apply bg-white border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal;

  &:focus {
    @apply outline-none shadow-outline;
  }
}
</style>
