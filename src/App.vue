<template>
  <v-app>
    <v-app-bar dense app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"
        ><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon
      >

      <v-spacer></v-spacer>

      <v-app-bar-title>
        {{ selectedPage.title }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="darkMode = !darkMode">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/apmyhr/small-utils" target="blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="selectedPageNumber">
          <v-list-item v-for="(page, index) in pages" v-bind:key="index">
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item href="/">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title>SmallUtils.com</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main class="mainSection">
      <IconSearch v-if="selectedPage.title == 'Icon Search'"></IconSearch>
      <Home v-else></Home>
    </v-main>
  </v-app>
</template>

<script>
import pages from "./configs/pages.json";

import Home from "./pages/Home";
import IconSearch from "./pages/IconSearch";

export default {
  name: "App",

  components: {
    Home,
    IconSearch,
  },

  created() {
    this.$vuetify.theme.dark = this.darkMode;
  },

  data: () => ({
    homePage: { title: "Small Utils", icon: "mdi-tools" },
    drawer: false,
    selectedPageNumber: 0,
  }),

  computed: {
    pages() {
      return pages.pages;
    },
    selectedPage() {
      if (
        typeof this.selectedPageNumber != "undefined" &&
        this.selectedPageNumber != null
      ) {
        return this.pages[this.selectedPageNumber];
      } else {
        return this.homePage;
      }
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
.mainSection {
  height: calc(100% - 48px);
}
</style>

<style>
.pageCard {
  height: calc(100%);
  width: 100%;
}
</style>
