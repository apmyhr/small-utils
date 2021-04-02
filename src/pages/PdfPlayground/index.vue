<template>
  <v-card-title tile elevation="16" class="mx-auto fill-height">
    <v-card-title>Add Text to put into PDF</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="fileName"
        label="File Name"
        hint="Set the file name"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-textarea
        label="Text"
        hint="Set the text of the PDF"
        v-model="text"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="makePDF" color="success"
        >Make PDF <v-icon right>mdi-file-download</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click="showFontList = true" color="primary"
        >Load Font <v-icon right>mdi-translate</v-icon></v-btn
      >
    </v-card-actions>

    <v-dialog v-model="showFontList" width="600">
      <v-card v-if="showFontList">
        <v-card-title>Searchable Font List</v-card-title>
        <v-card-text>
          <v-autocomplete
            :items="fontList"
            label="Search for Font"
            autofocus
            item-text="title"
            return-object
            @change="fontSelected"
          >
            <template v-slot:item="data">
              <v-list-item-title>
                {{ data.item.title }}
              </v-list-item-title>
              <v-list-item-subtitle> {{ data.item.file }}</v-list-item-subtitle>
            </template>
          </v-autocomplete>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card-title>
</template>

<script>
// import * as arrayUtils from "../../utils/arrayUtils";
// import * as functionUtils from "../../utils/functionUtils";
import { jsPDF } from "jspdf";

export default {
  name: "PdfPlayground",
  components: {},
  created() {
    //Get the list of fonts
    let myThis = this;
    fetch(this.fontListURL)
      .then((res) => res.json())
      .then((out) => {
        myThis.fontList = out;
        console.log(`Finished fetching ${myThis.fontList.length} font names`);
      })
      .catch((err) => {
        console.error("Could not fetch font list", err);
        throw err;
      });
  },
  mounted() {},
  data() {
    return {
      showFontList: false,
      fontListURL: "/data/fontList.json",
      fontFileURL: "/data/fonts/",
      fontList: [],
      loadedFonts: [],
      fileName: "MyPdf.pdf",
      // text: "Hello world this is some arabic text that I want to send to Jason.  He needs to remember to bring the stuff with him to our meeting on Monday.",
      text:
        "Hello world this is some arabic text that I want to send to Jason.  He needs to remember to bring the stuff with him to our meeting on Monday.\nمرحباً بالعالم ، هذا نص عربي أريد أن أرسله إلى جايسون. يجب أن يتذكر إحضار الأشياء معه إلى اجتماعنا يوم الاثنين.\n您好，世界，这是我想发送给Jason的一些阿拉伯文字。 他需要记住将这些东西带到我们周一的会议上。",
    };
  },
  computed: {},
  methods: {
    makePDF() {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF();

      //Go through and add any loaded fonts
      this.loadedFonts.forEach((p) => {
        // add the font to jsPDF
        doc.addFileToVFS(p.file, p.data);
        doc.addFont(p.file, p.title, "normal");
        doc.setFont(p.title);
      });

      doc.text(this.text, 10, 10);
      doc.save(this.fileName);
    },

    fontSelected(font) {
      //Read the font in as a blob, and then convert to a binary string
      let myThis = this;
      fetch(this.fontFileURL + font.file)
        .then((res) => res.blob())
        .then((out) => {
          let fontObj = {
            title: font.title,
            file: font.file,
          };
          myThis.loadedFonts.push(fontObj);
          console.log(
            `Finished fetching ${fontObj.title} font: ${out.size} bytes`
          );

          //We need to conver the blob to a binary string
          var reader = new FileReader();
          //File reader is for some reason asynchronous
          reader.onloadend = function () {
            fontObj.data = reader.result;
          };
          //This starts the conversion
          reader.readAsBinaryString(out);
        })
        .catch((err) => {
          console.error("Could not fetch font", err);
          throw err;
        });
    },
  },
};
</script>

<style>
</style>