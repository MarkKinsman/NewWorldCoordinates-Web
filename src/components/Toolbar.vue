<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase fixed subheading" id="toolbarTitle">
      <span>NEWWORLD</span>
      <span class="font-weight-light">COORDINATES</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon href="/">
      <v-icon id="iconSize">home</v-icon>
    </v-btn>
    <v-btn icon @click="setListMode">
      <v-icon id="iconSize">view_list</v-icon>
    </v-btn>
    <v-btn icon @click="setFloorPlanMode">
      <v-icon id="iconSize">dashboard</v-icon>
    </v-btn>
    <v-btn icon href="https://github.com/MarkKinsman/NewWorldCoordinates-Web">
      <v-icon id="iconSize">code</v-icon>
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
  },
  methods: {
    setListMode() {
      this.$store.commit("setAppMode", "List");
    },
    setFloorPlanMode() {
      this.$store.commit("setAppMode", "Floor Plan");
    }
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

