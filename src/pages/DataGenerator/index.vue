<template>
  <v-card>
    <v-card-title>Generate Randomized Data</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="number"
            label="Generate Number"
            prepend-icon="mdi-format-list-numbered"
            append-outer-icon="mdi-content-copy"
            append-icon="mdi-refresh"
            @click:append="refreshNumber"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
          v-model="paragraph"
            label="Generate Paragraph"
            prepend-icon="fas fa-paragraph"
            append-outer-icon="mdi-content-copy"
            append-icon="mdi-refresh"
            @click:append="refreshParagraph"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Random } from '../../utils/dataUtils';

export default {
  name: "DataGenerator",
  created() {
  },
  data() {
    return {
        number: 0,
        paragraph: ""
    };
  },
  computed: {},
  methods: {
      refreshNumber(){
          this.number = Random.number();
      },
      refreshParagraph(){
          this.paragraph = Random.paragraph();
      },
  },
};
</script>

<style>
</style>