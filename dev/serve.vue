<template>
  <div id="app">
    <form-file name="files" v-model="files" placeholder="Select or drop your file .." multiple="true" />
  </div>
</template>

<script>
import { FormFile } from '@/main';

export default {
  name: 'App',
  components: {
    FormFile
  },
  data() {
    return {
      files: null
    };
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
