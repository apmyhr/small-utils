<template>
  <v-card elevation="16" max-width="400" class="mx-auto">
    <v-card-title class="white--text orange darken-4">
      Icon Search
      <v-spacer></v-spacer>
      <v-btn color="white" class="text--primary" fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-text-field v-model="filterText" clearable></v-text-field>
    </v-card-title>
    <v-virtual-scroll
      :items="filteredIcons"
      height="300"
      item-height="64"
      bench="2"
    >
      <template v-slot:default="{ item }">
        <v-list-item :key="item">
          <v-list-item-icon
            ><v-icon>{{ item }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="copyText(item)"
              ><v-icon small> mdi-content-copy </v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
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
  data() {
    return {
      /** @type {String[]} List of Icons */
      icons: [],
      filterText: "",
    };
  },
  computed: {
    filteredIcons() {
      if (this.filterText) {
        let lowerCase = this.filterText.toLowerCase();
        return this.icons.filter((p) => p.indexOf(lowerCase) != -1);
      } else {
        return this.icons;
      }
    },
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text);
    },
  },
};
</script>

<style>
</style>