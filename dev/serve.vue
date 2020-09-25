<template>
  <div id="app">
    <form-group label="Hello world" />
  </div>
</template>

<script>
import Vue from 'vue';
import { FormGroup } from '@/main';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FormGroup,
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
