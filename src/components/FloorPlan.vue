<template>
  <v-container style="padding: 5px">
    <div ref="planImg" id="planImg" class="img-overlay-wrap">
      <img v-if="image !=null" :src="image.src" id="plan">
      <svg viewBox="0 0 573 573"></svg>
    </div>
  </v-container>
</template>

<script>
var d3 = require("d3");

export default {
  name: "FloorPlan",
  data: () => ({
    image: null
  }),
  mounted() {
    this.LoadImage();
    this.DrawChart();
  },
  methods: {
    DrawChart() {
      var jsonCircles = [
        { x_axis: 0, y_axis: 0, radius: 10, color: "green" },
        { x_axis: 573, y_axis: 0, radius: 10, color: "green" },
        { x_axis: 0, y_axis: 250, radius: 10, color: "green" },
        { x_axis: 573, y_axis: 250, radius: 10, color: "green" },
        { x_axis: 70, y_axis: 70, radius: 10, color: "purple" },
        { x_axis: 110, y_axis: 100, radius: 10, color: "red" }
      ];

      var svgContainer = d3.select("svg");

      var circles = svgContainer
        .selectAll("circle")
        .data(jsonCircles)
        .enter()
        .append("circle");

      circles
        .attr("cx", function(d) {
          return d.x_axis;
        })
        .attr("cy", function(d) {
          return d.y_axis;
        })
        .attr("r", function(d) {
          return d.radius;
        })
        .style("fill", function(d) {
          return d.color;
        });
    },
    LoadImage() {
      let img = new Image();
      img.src = require("../assets/testFloorPlan.jpg");
      this.image = img;
    }
  },
  computed: {
    svgViewBox() {
      try {
        return (
          "0 0" + " " + String(this.imgWidth) + " " + String(this.imgHeight)
        );
      } catch {
        return "0 0 500 500";
      }
    },
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
.img-overlay-wrap {
  position: relative;
  display: inline-block; /* <= shrinks container to image size */
  /* transition: transform 150ms ease-in-out; */
}

.img-overlay-wrap img {
  /* <= optional, for responsiveness */
  display: block;
  max-width: 100%;
  height: auto;
}

.img-overlay-wrap svg {
  position: absolute;
  top: 0;
  left: 0;
}

/* .img-overlay-wrap:hover {
  transform: rotate(15deg);
} */
</style>
