<template>
  <v-dialog v-model="showList"></v-dialog>
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
  },
  data() {
    return {
      showList: false,
      keyActions: [
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
     * @param {KeyboardEvent} e
     */
    keyEvent(e) {
      //Only execute when ctrl and shift keys are held down.
      if (e.ctrlKey && e.shiftKey) {
        let hotKey = this.keyActions.find((k) => k.key == e.key.toLowerCase());
        if (hotKey) {
          console.log(`Hotkey pressed: ${e.key} - ${hotKey.title}`);
          hotKey.action();
          return false;
        }
      }
    },
  },
};
</script>

<style>
</style>