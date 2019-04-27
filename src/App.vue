<template>
  <v-app>
    <Toolbar/>

    <v-content id="main">
      <Header/>
      <DataTable/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import DataTable from "./components/DataTable";

export default {
  name: "App",
  components: {
    Header,
    Toolbar,
    DataTable
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
#main {
  width: 55%;
  min-width: 360px;
  margin: auto;
  padding: 10px;
  display: -webkit-flex; /* Safari */
  display: flex;
}
</style>
