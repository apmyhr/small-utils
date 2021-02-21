<template>
  <v-dialog v-model="showList" width="600">
    <v-card v-if="showList">
      <v-card-title>Searchable Hotkey Actions</v-card-title>
      <v-card-text>
        <v-autocomplete
          :items="keyActions"
          label="Search for Action"
          autofocus
          item-text="title"
          return-object
          @change="actionSelected"
        >
          <template v-slot:item="data">
            <v-list-item-avatar>
              <v-icon>{{ data.item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ data.item.title }}
            </v-list-item-title>
            <v-list-item-action-text>
              <v-chip-group>
                <v-chip color="info">Ctrl</v-chip>
                <v-chip color="success">Shift</v-chip>
                <v-chip color="warning">{{
                  data.item.key.toUpperCase()
                }}</v-chip>
              </v-chip-group>
            </v-list-item-action-text>
          </template>
        </v-autocomplete>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export class HotkeyAction {
  /**
   * Bind a hotkey to an action.
   *
   * @param {String} key The Key to bind to
   * @param {String} title Title of the action
   * @param {String} icon Icon for the action
   * @param {Function} action The action to execute
   */
  constructor(key, title, icon, action) {
    /** @type {String} The Key */
    this.key = key;
    /** @type {String} title of the action */
    this.title = title;
    /** @type {String} icon of the action */
    this.icon = icon;
    /** @type {Function} The Action to execute when hotkey is pressed */
    this.action = action;
  }
}

export default {
  name: "Hotkeys",
  created() {
    console.log("Registering hotkey listener");
    document.onkeydown = this.keyEvent;

    this.$bus.$on("show-hotkeys", () => {
      this.showList = true;
    });
  },
  data() {
    return {
      showList: false,
      keyActions: [
        new HotkeyAction("p", "Execute an Action", "mdi-keyboard", () => {
          this.showList = true;
        }),
        new HotkeyAction(
          "d",
          "Toggle Dark Mode",
          "mdi-theme-light-dark",
          () => {
            this.darkMode = !this.darkMode;
          }
        ),
      ],
    };
  },

  computed: {
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
    /**
     * Action selected from drop down
     * @param {HotkeyAction} item
     */
    actionSelected(item) {
      console.log(`Selected action: ${item.title}`);
      item.action.apply(this);
      this.showList = false;
    },

    /**
     * Key down event.
     * @param {KeyboardEvent} e
     */
    keyEvent(e) {
      //Only execute when ctrl and shift keys are held down.
      if (e.ctrlKey && e.shiftKey) {
        let hotKey = this.keyActions.find((k) => k.key == e.key.toLowerCase());
        if (hotKey) {
          console.log(`Hotkey pressed: ${e.key} - ${hotKey.title}`);
          hotKey.action.apply(this);
          return false;
        }
      }
    },
  },
};
</script>

<style>
</style>