<template>
  <v-container style="padding: 5px">
    <div ref="planImg" id="planImg">
      <v-img :src="require('../assets/testFloorPlan.jpg')" id="plan"></v-img>
    </div>
  </v-container>
</template>

<script>
var d3 = require("d3");

export default {
  name: "FloorPlan",
  data: () => ({}),
  methods: {},
  computed: {
    plan() {
      return document.getElementById("plan");
    },
    imgContainerHeight() {
      return this.$refs.planImg.clientHeight;
    },
    imgContainerWidth() {
      return this.$refs.planImg.clientWidth;
    },
    imgX() {
      return this.plan.getBoundingClientRect().x;
    },
    imgY() {
      return this.plan.getBoundingClientRect().y;
    },
    imgWidth() {
      return this.plan.getBoundingClientRect().width;
    },
    imgHeight() {
      return this.plan.getBoundingClientRect().height;
    },
    imgTop() {
      return this.plan.getBoundingClientRect().top;
    },
    imgBottom() {
      return this.plan.getBoundingClientRect().bottom;
    },
    imgRight() {
      return this.plan.getBoundingClientRect().right;
    },
    imgLeft() {
      return this.plan.getBoundingClientRect().left;
    },
    xScale() {
      let self = this;
      return d3
        .scaleLinear()
        .domain([0, self.imgWidth])
        .range([0, 1]);
    },
    yScale() {
      let self = this;
      return d3
        .scaleLinear()
        .domain([0, self.imgHeight])
        .range([0, 1]);
    }
  }
};
</script>

<style>
</style>
