<template>
  <div id="viewerContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script>
import { bus } from "@/main";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js";

export default {
  name: "PdfViewerCmp",
  data() {
    return {
      CMAP_URL: "node_modules/pdfjs-dist/cmaps/",
      CMAP_PACKED: true,
      DEFAULT_URL: "./sample.pdf",
      pdfFindController: null
    };
  },
  mounted() {
    var eventBus = new pdfjsViewer.EventBus();
    // (Optionally) enable hyperlinks within PDF files.
    var pdfLinkService = new pdfjsViewer.PDFLinkService({
      eventBus: eventBus
    });
    this.getPdf(eventBus, pdfLinkService);
    bus.$on("changeQuery", data => {
      this.search(data);
    });
    bus.$on("changeDocumentUrl", () => {
      this.getPdf(eventBus, pdfLinkService);
    });
  },
  methods: {
    async getPdf(eventBus, pdfLinkService) {
      var _this = this;
      var container = document.getElementById("viewerContainer");
      this.pdfFindController = new pdfjsViewer.PDFFindController({
        eventBus: eventBus,
        linkService: pdfLinkService
      });
      var pdfViewer = new pdfjsViewer.PDFViewer({
        container: container,
        eventBus: eventBus,
        linkService: pdfLinkService,
        findController: this.pdfFindController
      });
      pdfLinkService.setViewer(pdfViewer);

      eventBus.on("pagesinit", function() {
        // pdfViewer.currentScaleValue = "page-width";
        _this.search();
      });

      // Loading document.
      var loadingTask = pdfjsLib.getDocument({
        url: this.$store.getters.documentUrl,
        cMapUrl: this.CMAP_URL,
        cMapPacked: this.CMAP_PACKED
      });
      loadingTask.promise.then(function(pdfDocument) {
        pdfViewer.setDocument(pdfDocument);
        pdfLinkService.setDocument(pdfDocument, null);
      });
    },
    search(text) {
      if (!text) text = this.$store.getters.query;
      this.pdfFindController.executeCommand("find", {
        query: text,
        caseSensitive: false,
        highlightAll: true,
        phraseSearch: true,
        scrollMatches: true
        // findPrevious: true
      });
    }
  }
};
</script>

<style>
#viewerContainer {
  overflow: auto;
  position: absolute;
  color: white;
  height: 100%;
}
div.page {
  display: inline-block;
}
</style>
