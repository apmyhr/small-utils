<template>
  <v-snackbar v-model="copySnackbar" timeout="2000">
    {{ copiedText }} Copied to Clipboard
  </v-snackbar>
</template>

<script>
export default {
  name: "Clipboard",
  created() {
    this.$bus.$on("copy-text", this.copyText);
  },
  data() {
    return {
      copySnackbar: false,
      copiedText: null,
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
      this.copySnackbar = true;
      this.copiedText = text;
    },
  },
};
</script>

<style>
</style>