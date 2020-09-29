<template>
  <div class="form-file">
    <input :id="name" class="form-file__input" type="file" v-bind="inputAttributes" v-on="inputListeners" />
    <label :for="name" class="form-file__label" v-on="labelListeners" :class="{ isDragging: dragging }">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Select or drop a file onto this field..'
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: [File, FileList]
    }
  },
  data() {
    return {
      selection: null,
      dragging: false
    };
  },
  computed: {
    inputAttributes() {
      const { $attrs, name, value } = this;

      return {
        ...$attrs,
        name,
        files: value
      };
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      };
    },
    labelListeners() {
      return {
        dragenter: this.onDragenter,
        dragover: this.onDragover,
        dragleave: this.onDragleave,
        drop: this.onDrop
      };
    },
    label() {
      if (!this.selection || this.selection.length == 0) {
        return this.placeholder;
      }

      return this.selection.map(f => f.name).join(', ');
    }
  },
  methods: {
    onInput(e) {
      const files = e.type == 'drop' ? e.dataTransfer.files : e.target.files;

      this.$emit('input', files);
      this.selection = Array.from(files);
    },
    onDragenter(e) {
      this.dragging = true;
    },
    onDragover(e) {
      e.preventDefault();
      this.dragging = true;
    },
    onDragleave(e) {
      this.dragging = false;
    },
    onDrop(e) {
      e.preventDefault();
      this.dragging = false;
      this.onInput(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-file {
  position: relative;

  &__input {
    @apply w-full;
    opacity: 0;
    position: relative;
  }

  &__label,
  &__label:before {
    @apply py-2 px-4;
    position: absolute;
    top: 0;
  }

  &__label {
    @apply bg-white border border-gray-300 leading-normal rounded;
    appearance: none;
    left: 0;
    right: 0;
    overflow-x: hidden;
    padding-left: 130px;
    white-space: nowrap;

    &:hover {
      cursor: pointer;

      &:before {
        @apply bg-gray-100;
      }
    }

    &:focus {
      @apply shadow-outline;
      outline: none;
    }

    &:before {
      @apply bg-white border-r border-gray-300 rounded-l;
      content: 'Choose File';
      left: 0;
    }

    &.isDragging {
      @apply bg-gray-200;
    }
  }
}
</style>
