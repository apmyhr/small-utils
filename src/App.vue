<template>
  <v-app style="height: calc(100vh)">
    <v-app-bar dense app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"
        ><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon
      >
      <v-app-bar-nav-icon @click="$bus.$emit('show-hotkeys')"
        ><v-icon>mdi-keyboard</v-icon></v-app-bar-nav-icon
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
      <PdfPlayground v-else-if="selectedPage.title == 'PDF Playground'"></PdfPlayground>
      <DataGenerator
        v-else-if="selectedPage.title == 'Data Generator'"
      ></DataGenerator>
      <Home v-else-if="selectedPage.url == ''"></Home>
      <ComingSoon v-else :page="selectedPage"></ComingSoon>
    </v-main>
    <Clipboard></Clipboard>
    <Hotkeys></Hotkeys>
  </v-app>
</template>

<script>
import pages from "./configs/pages.json";

import ComingSoon from "./components/ComingSoon";
import Clipboard from "./components/Clipboard";
import Hotkeys from "./components/Hotkeys";
import Home from "./pages/Home";
import IconSearch from "./pages/IconSearch";
import PdfPlayground from "./pages/PdfPlayground";
import DataGenerator from "./pages/DataGenerator";

import * as domUtils from "./utils/domUtils";

export default {
  name: "App",

  components: {
    Clipboard,
    Hotkeys,
    ComingSoon,
    Home,
    IconSearch,
    PdfPlayground,
    DataGenerator,
  },

  created() {
    this.$vuetify.theme.dark = this.darkMode;

    this.$bus.$on("go-to-page", (page) => {
      if (page) {
        this.selectedPage = page;
      } else {
        this.selectedPage = this.homePage;
      }
    });

    //Get the path name, minus the leading /
    // http://localhost:8080/Icon = > Icon
    let pathName = window.location.pathname.substring(1);
    if (pathName) {
      this.setPageFromUrl(pathName);
    }

    let myThis = this;

    window.onpopstate = function (event) {
      pathName = window.location.pathname.substring(1);
      console.log(
        `onpopstate - location: ${document.location}, state: ${JSON.stringify(
          event.state
        )}`
      );
      myThis.setPageFromUrl(pathName);
    };
  },

  data: () => ({
    homePage: {
      url: "",
      title: "Small Utils",
      icon: "mdi-tools",
      description:
        "A collection of web based utilities, such as MDI and Font Awesome icon search.",
      keywords: "SmallUtils",
    },
    drawer: false,
    selectedPageNumber: null,
  }),

  computed: {
    pages() {
      return pages.pages;
    },
    selectedPage: {
      get: function () {
        if (
          typeof this.selectedPageNumber != "undefined" &&
          this.selectedPageNumber != null
        ) {
          return this.pages[this.selectedPageNumber];
        } else {
          return this.homePage;
        }
      },
      set: function (page) {
        this.setPageFromUrl(page.url);
      },
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

  methods: {
    setPageFromUrl(url) {
      let index = this.pages.findIndex((p) => p.url == url);
      if (index != -1) {
        this.selectedPageNumber = index;
      } else {
        this.selectedPageNumber = null;
      }
    },
  },

  watch: {
    selectedPage(page) {
      //Store the URL in history
      if (window.location.pathname != "/" + page.url) {
        if (page?.url) {
          history.pushState({}, page.title, page.url);
        } else {
          document.location = "/";
        }
      }

      if (page) {
        domUtils.UpdatePageMetaTag(page.description, page.title, page.keywords);
      }
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
/** Remove always visible scroll bar */
html {
  overflow-y: auto;
}
</style>
