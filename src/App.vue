<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn icon @click="darkMode = !darkMode">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  created(){
    console.log(this.darkMode);
    this.$vuetify.theme.dark = this.darkMode;
  },

  data: () => ({
    //
  }),

  computed: {
    darkMode: {
      get: function(){
        return this.$store.state.settings.darkMode;
      },
      set: function(newValue){
        this.$store.commit('settings/darkMode', newValue);
        this.$vuetify.theme.dark = newValue;
      }
    }
  }
};
</script>
