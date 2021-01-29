<template>
  <v-card
    class="d-flex justify-center flex-wrap container"
    tile
    flat
    color="transparent"
  >
    <v-hover v-slot="{ hover }" v-for="(page, index) in pages" :key="index">
      <v-card tile flat color="transparent" class="card ma-6">
        <div class="face face1" @click="if (hover) { goToPage(page) }">
          <div class="content">
            <v-icon>{{ page.icon }}</v-icon>
            <h3>{{ page.title }}</h3>
          </div>
        </div>
        <v-expand-transition>
          <div class="face face2" v-if="hover">
            <div class="content">
              <p class="body-2 black--text">{{ page.description }}</p>
              <v-btn color="warning" class="mt-6" @click="goToPage(page)">{{
                page.title
              }}</v-btn>
            </div>
          </div>
        </v-expand-transition>
      </v-card>
    </v-hover>
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
  },
  methods: {
    goToPage(page) {
      this.$bus.$emit("go-to-page", page);
    },
  },
};
</script>

<style scoped>
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
.cardGlowEffect {
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

.container .card .face.face1 .content i {
  font-size: 3em;
  color: white;
  display: inline-block;
}

.container .card .face.face1 .content h3 {
  font-size: 1em;
  color: white;
  text-align: center;
}

.container .card .face.face2 {
  position: relative;
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
}

.container .card .face.face2 .content a {
  text-decoration: none;
  color: black;
  box-sizing: border-box;
  outline: 1px dashed #333;
  padding: 10px;
  margin: 15px 0 0;
  display: inline-block;
}

.container .card .face.face2 .content a:hover {
  background: #333;
  color: whitesmoke;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>