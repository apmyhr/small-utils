<template>
  <v-card>
    <v-card-title class="headline">
      {{ icon }}
      <v-spacer></v-spacer>
      <v-btn icon x-large @click="copyVuetifyIcon(' x-large', '')">
        <v-icon x-large>{{ icon }}</v-icon>
      </v-btn>
      <v-btn icon large @click="copyVuetifyIcon(' large', '')">
        <v-icon large>{{ icon }}</v-icon>
      </v-btn>
      <v-btn icon @click="copyVuetifyIcon('', '')">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
      <v-btn icon small @click="copyVuetifyIcon(' small', '')">
        <v-icon small>{{ icon }}</v-icon>
      </v-btn>
      <v-btn icon x-small @click="copyVuetifyIcon(' x-small', '')">
        <v-icon x-small>{{ icon }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll :items="colors" height="600" item-height="260" bench="2">
      <template v-slot:default="{ item }">
        <v-card
          tile
          class="d-flex align-end mb-6"
          :light="item == 'light'"
          :dark="item == 'dark'"
        >
          <v-btn
            v-for="(s, index) in sizes"
            :key="item + '_' + index"
            :width="s"
            :height="s"
            icon
            class="mx-2"
            :class="'mb-' + Math.min(index * 2, 6)"
            @click="
              copyVuetifyIcon(
                ` size=&quot;${s}&quot;`,
                ` color=&quot;${item}&quot;`
              )
            "
          >
            <v-icon :size="s" :color="item">{{ icon }}</v-icon>
          </v-btn>
        </v-card>
      </template>
    </v-virtual-scroll>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import colors from "vuetify/lib/util/colors";
import * as stringUtils from "../../utils/stringUtils";

export default {
  name: "IconPopup",
  props: {
    icon: String,
  },
  data() {
    return {
      sizes: [256, 128, 64, 32, 24],
    };
  },
  computed: {
    colors() {
      //Get colors from Vuetify material design colors
      let options = Object.keys(colors).filter((o) => o != "shades");

      //Convert lightBlue to light-blue and such
      options = options.map((o) => stringUtils.fromCamelCase(o, "-", true));

      //Add items for dark and light mode
      options = ["light", "dark"].concat(options);
      return options;
    },
  },
  methods: {
    copyVuetifyIcon(size, color) {
      let vIcon = `<v-icon${size}${color}>${this.icon}</v-icon>`;
      this.$bus.$emit("copy-text", vIcon);
    },
  },
};
</script>

<style>
</style>