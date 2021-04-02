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
      text:
        "English: Send Jason the tape of our conversation from Friday.  He needs to bring the stuff in three days." +
        "\n\nSpanish: Envoyez à Jason la cassette de notre conversation de vendredi. Il doit apporter les affaires dans trois jours.."+
        "\n\nFrench: Envíale a Jason la cinta de nuestra conversación del viernes. Necesita traer las cosas en tres días."+
        "\n\nRussian: Отправьте Джейсону запись нашего разговора с пятницы. Ему нужно привезти вещи через три дня."+
        "\n\nTurkish: Jason'a Cuma günkü konuşmamızın kasetini gönder. Eşyaları üç gün içinde getirmesi gerekiyor."+
        "\n\nPersian: نوار گفتگوی ما را از جمعه برای جیسون ارسال کنید. او باید ظرف سه روز وسایل را بیاورد."+
        "\n\nArabic: أرسل لجيسون شريط حديثنا يوم الجمعة. يحتاج إلى إحضار الأشياء في ثلاثة أيام." +
        "\n\nChinese Simplified: 从星期五开始，向杰森发送我们谈话的录音带。 他需要三天之内就带好东西。" +
        "\n\nChinese Traditional: 從星期五開始，向杰森發送我們談話的錄音帶。 他需要三天之內就帶好東西。" +
        "\n\nKorean: 금요일부터 우리 대화 테이프를 Jason에게 보냅니다. 그는 3 일 안에 물건을 가져와야합니다." +
        "\n\nVietnamese: Gửi cho Jason đoạn băng cuộc trò chuyện của chúng ta từ thứ Sáu. Anh ấy cần mang đồ sau ba ngày nữa."
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

      var lMargin=15; //left margin in mm
      var rMargin=15; //right margin in mm
      var pdfInMM=210;  // width of A4 in mm

      var lines = doc.splitTextToSize(this.text, (pdfInMM-lMargin-rMargin));

      doc.text(lMargin, 20, lines);
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