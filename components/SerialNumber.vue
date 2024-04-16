<template>
  <div>
    <c-code :id="'serial-' + text" mr="3">{{text}}</c-code>
    <c-button variant-color="green" size="sm" @click="remember">Запомнить</c-button>
  </div>
</template>
<script lang="js">
    export default {
      name: 'SerialNumber',
      props: ['text'],
      methods: {
        remember() {
          this.$emit('remember', this.text);
        }
      }
    }
</script>
