<template>
  <v-app>
    <v-app-bar dense app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"><v-icon>mdi-tools</v-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Small Utils</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="darkMode = !darkMode">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedPage"
        >
          <v-list-item v-for="(page, index) in pages" v-bind:key="index">
            <v-list-item-icon>
              <v-icon>{{page.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{page.title}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="mainSection">
      <IconSearch></IconSearch>
    </v-main>
  </v-app>
</template>

<script>
import pages from "./configs/pages.json"

import IconSearch from "./pages/IconSearch"

export default {
  name: "App",

  components: {
    IconSearch,
  },

  created() {
    console.log(this.darkMode);
    this.$vuetify.theme.dark = this.darkMode;
  },

  data: () => ({
    drawer: false,
    selectedPage: null,
  }),

  computed: {
    pages(){
      return pages.pages;
    },
    darkMode: {
      get: function () {
        return this.$store.state.settings.darkMode;
      },
      set: function (newValue) {
        this.$store.commit("settings/darkMode", newValue);
        this.$vuetify.theme.dark = newValue;
      },
    },
  },
};
</script>

<style scoped>
.mainSection{
  height: calc(100% - 48px);
}
</style>

<style>
.pageCard {
  height: calc(100%);
  width: 100%;
}
</style>
