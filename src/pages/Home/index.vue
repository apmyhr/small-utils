<template>
  <v-card flat tile :color="darkMode ? '#121212' : '#FFFFFF'">
    <v-card
      class="d-flex justify-center flex-wrap container"
      tile
      flat
      color="transparent"
    >
      <v-hover v-slot="{ hover }" v-for="(page, index) in pages" :key="index">
        <v-card tile flat color="transparent" class="card ma-6">
          <div
            class="face face1"
            @click="
              if (hover) {
                goToPage(page);
              }
            "
          >
            <div class="content">
              <v-icon size="64" color="white">{{ page.icon }}</v-icon>
              <h3 class="white--text text-center">{{ page.title }}</h3>
            </div>
          </div>
          <v-expand-transition>
            <v-card v-show="hover" tile width="320">
              <div class="content">
                <p class="body-2 px-6 pt-8">{{ page.description }}</p>
                <v-btn color="warning" class="ma-6" @click="goToPage(page)">{{
                  page.title
                }}</v-btn>
              </div>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-card>
  </v-card>
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
    darkMode() {
      return this.$store.state.settings.darkMode;
    },
  },
  methods: {
    goToPage(page) {
      this.$bus.$emit("go-to-page", page);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}

.container .card .face {
  width: 320px;
  height: 220px;
}

.container .card .face.face1 {
  position: relative;
  background: #333;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 1;
}

.container .card:hover .face.face1 {
  box-shadow: inset 0 0 60px whitesmoke, inset 20px 0 80px #f0f,
    inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff,
    0 0 50px #fff, -10px 0 80px #f0f, 10px 0 80px #0ff;
}

.container .card .face.face1 .content {
  opacity: 0.2;
  text-align: center;
}

.container .card:hover .face.face1 .content {
  opacity: 1;
}
</style>