<template>
  <v-card
    tile
    elevation="16"
    class="mx-auto pageCard"
    v-resize="onResize"
    id="iconListCard"
  >
    <v-card-title class="white--text orange darken-4">
      Icon Search
      <v-spacer></v-spacer>
      <v-btn color="white" class="text--primary" fab small>
        <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-text-field clearable @input="updateFilterText"></v-text-field>
    </v-card-title>
    <v-virtual-scroll
      :items="iconRows"
      height="600"
      :item-height="iconCardSize.height"
      bench="10"
    >
      <template v-slot:default="{ item }">
        <v-card
          class="d-flex align-content-start justify-center flex-wrap"
          color="grey lighten-2"
          flat
          tile
          :height="iconCardSize.height"
        >
          <v-card
            v-for="(icon, index) in item"
            v-bind:key="icon + index"
            outlined
            tile
            :height="iconCardSize.height"
            :width="iconCardSize.width"
          >
            <v-icon size="88" class="mx-8">{{ icon }}</v-icon>
            <v-card-actions class="caption pa-0 ma-0">
              <v-card-subtitle class="caption pa-0 ma-0 ml-2 text-truncate"
                >{{ icon }}
              </v-card-subtitle>
              <v-spacer></v-spacer>
              <v-btn small icon @click="copyText(icon)"
                ><v-icon small> mdi-content-copy </v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import * as arrayUtils from "../../utils/arrayUtils";
import * as functionUtils from "../../utils/functionUtils";

export default {
  name: "IconSearch",
  components: {},
  created() {
    //Get a handle to this before we fire off the async fetch call
    let myThis = this;

    let url = "/data/iconList.json";

    fetch(url)
      .then((res) => res.json())
      .then((out) => {
        myThis.icons = out;
        console.log(`Finished fetching ${myThis.icons.length} icons`);
      })
      .catch((err) => {
        console.error("Could not fetch icon list", err);
        throw err;
      });
  },
  mounted() {
    this.onResize();
  },
  data() {
    return {
      /** @type {String[]} List of Icons */
      icons: [],
      filterText: "",
      iconListSize: {
        width: 0,
        height: 0,
      },
      iconCardSize: {
        width: 152,
        height: 124,
      },
    };
  },
  computed: {
    /**
     * Get filtered list of icons based on the searched text
     * @returns {String[]} List of icons
     */
    filteredIcons() {
      if (this.filterText) {
        let lowerCase = this.filterText.toLowerCase();
        let filteredList = this.icons.filter((p) => p.indexOf(lowerCase) != -1);

        //Sort it such that items with the filtered text in beginning will show up first
        //When searching "file", this ensures "mdi-file" will show up long before "mdi-face-profile"
        filteredList.sort(function (a, b) {
          return a.indexOf(lowerCase) - b.indexOf(lowerCase);
        });

        return filteredList;
      } else {
        return this.icons;
      }
    },

    /**
     * Split list of icons into rows based on the width of the screen
     * @returns {String[][]} List of rows
     */
    iconRows() {
      //Figure out row length based on width
      let rowLength = Math.max(
        Math.floor(this.iconListSize.width / this.iconCardSize.width),
        1
      );

      let rows = arrayUtils.divideIntoRows(this.filteredIcons, rowLength);

      return rows;
    },
  },
  methods: {
    updateFilterText: functionUtils.debounce(function (newValue) {
      this.filterText = newValue;
    }, 500),
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
    onResize() {
      let element = document.getElementById("iconListCard");
      this.iconListSize = {
        width: element.clientWidth,
        height: element.clientHeight,
      };
    },
  },
};
</script>

<style>
</style>