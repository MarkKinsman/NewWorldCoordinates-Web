<template>
  <v-container style="padding: 5px">
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/plane.svg')" class="my-3" contain height="150"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-1 font-weight-bold mb-3">New World Coordinates</h1>
        <p class="subheading font-weight-regular">Real time visualization of construction issues</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({})
};
</script>

<style>
</style>
