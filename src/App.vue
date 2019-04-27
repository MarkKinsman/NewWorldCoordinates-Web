<template>
  <v-app>
    <Toolbar/>
    <v-content id="main">
      <Header/>
      <!-- DATA TABLE -->
      <transition name="ui-fade">
        <DataTable v-if="appMode=='List'"/>
        <FloorPlan v-if="appMode=='Floor Plan'"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import DataTable from "./components/DataTable";
import FloorPlan from "./components/FloorPlan";

export default {
  name: "App",
  components: {
    Header,
    Toolbar,
    DataTable,
    FloorPlan
  },
  data() {
    return {
      //
    };
  },
  computed: {
    appMode() {
      return this.$store.state.appMode;
    }
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
.ui-fade-enter-active,
.ui-fade-leave-active {
  transition: opacity 0.5s;
}
.ui-fade-enter,
.ui-fade-leave-to {
  opacity: 0;
}
</style>
