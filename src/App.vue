<template>
  <div id="app">
    <span class="sidebar">
      <PdfToolbar />
    </span>
    <span class="viewport" style>
      <PdfViewerCmp />
    </span>
  </div>
</template>

<script>
import PdfViewerCmp from "@/components/PdfViewerCmp";
import PdfToolbar from "@/components/PdfToolbar";
import { store } from "./store/store";

export default {
  name: "App",
  store,
  components: {
    PdfViewerCmp,
    PdfToolbar
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: grey;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: inline-block;
}
.sidebar {
  width: 20%;
  background: #4e4e4e;
  height: 100%;
  float: left;
  color: #ffffff;
}
.viewport {
  position: relative;
  display: inline-block;
  width: 78%;
  height: 100%;
}
</style>
