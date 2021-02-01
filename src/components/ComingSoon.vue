<template>
  <v-card width="500" class="mx-auto mt-6" flat tile color="transparent">
    <v-card-title class="headline">Coming Soon</v-card-title>
    <v-card-text>{{ page.description }}</v-card-text>
    <v-icon size="256" class="text-center">{{ page.icon }}</v-icon>
    <v-card-actions>
      <v-btn color="warning" class="ma-6" @click="goHome"
        ><v-icon left class="mr-4">mdi-home-city</v-icon> SmallUtils.com</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["page"],
  methods: {
    goHome() {
      this.$bus.$emit("go-to-page", null);
    },
  },
};
</script>

<style scoped>
</style>