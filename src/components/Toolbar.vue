<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase fixed subheading" id="toolbarTitle">
      <span>NEWWORLD</span>
      <span class="font-weight-light">COORDINATES</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat href="https://github.com/MarkKinsman/NewWorldCoordinates-Web" target="_blank">
      <span class="mr-2">GitHub</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>

<style scoped>
#toolbarTitle {
  font-size: 11px;
}
#iconSize {
  font-size: 20;
}
</style>

