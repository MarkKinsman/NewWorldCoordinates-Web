<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Issue Details</v-card-title>

        <v-card-text>{{creator}}</v-card-text>
        <v-card-text>{{status}}</v-card-text>
        <v-card-text>{{comments}}</v-card-text>
        <v-card-text>{{color}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="SetDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ModalDetail",
  props: ["color", "creator", "status", "comments"],
  data: () => ({
    //dialog: false
  }),
  methods: {
    SetDialog() {
      this.$store.commit("setModal", false);
    }
  },
  // watch: {
  //   dialog: function(val) {
  //     this.$store.commit("setModal", val);
  //   }
  // },
  computed: {
    dialog() {
      return this.$store.state.modal;
    }
  }
};
</script>

<style>
</style>
