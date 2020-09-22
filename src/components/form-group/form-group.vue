<template>
  <div class="mt-4">
    <label v-if="label" :for="name" class="text-xs uppercase">{{ label }}</label>
    <slot></slot>
    <span v-if="error" v-text="error" class="text-red-400 text-xs"></span>
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
