<template>
  <v-container class="pa-4 text-center">
    <v-row align="center" justify="center">
      <template v-for="(page, index) in pages">
        <v-col :key="index" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-icon size="124">{{ page.icon }}</v-icon>
              <v-card-text class="my-4 text-center title">
                {{ page.title }}
              </v-card-text>
              <v-card-subtitle class="my-4 text-center">{{
                page.description
              }}</v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import pages from "../../configs/pages.json";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    pages() {
      return pages.pages;
    },
  },
};
</script>

<style>
</style>