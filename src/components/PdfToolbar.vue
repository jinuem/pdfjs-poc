<template>
  <div>
    <div id="documentUrl">
      <div>
        <label for="documentUrl">Document URL</label>
      </div>
      <textarea @input="changeDocumentUrl" name="documentUrl" rows="5" />
    </div>
    <div id="search">
      <div>
        <label for="query">Find</label>
      </div>
      <textarea @input="changeQuery" name="query" rows="10" />
    </div>
  </div>
</template>

<script>
import { bus } from "@/main";

export default {
  name: "PdfToolbar",
  methods: {
    changeQuery: function(event) {
      this.$store.commit("changeQuery", event.target.value);
      bus.$emit("changeQuery", event.target.value);
    },
    changeDocumentUrl() {
      this.$store.commit("changeDocumentUrl", event.target.value);
      bus.$emit("changeDocumentUrl", event.target.value);
    }
  }
};
</script>

<style>
#search,
#documentUrl {
  background: #4e4e4e;
  color: white;
  padding: 5px;
}
</style>
