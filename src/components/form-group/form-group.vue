<template>
  <div class="form-group">
    <label v-if="label" :for="name" class="form-group__label">{{ label }}</label>
    <slot></slot>
    <span v-if="error" v-text="error" class="form-group__error"></span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
    error: String
  }
};
</script>

<style lang="scss">
.form-group {
  &__label {
    @apply text-xs uppercase;
  }
  &__error {
    @apply text-red-400 text-xs;
  }
}
</style>
