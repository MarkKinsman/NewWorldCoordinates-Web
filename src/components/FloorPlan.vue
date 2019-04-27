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
      const div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var jsonCircles = [
        { x_axis: 0, y_axis: 0, color: "green", note: "sample" },
        { x_axis: 573, y_axis: 0, color: "green", note: "sample" },
        { x_axis: 0, y_axis: 250, color: "green", note: "sample" },
        {
          x_axis: 573,
          y_axis: 250,
          color: "green",
          note: "sample"
        }
      ];

      var svgContainer = d3.select("svg");

      var circles = svgContainer
        .selectAll("circle")
        .data(this.markupData)
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
          return 10;
        })
        .attr("note", function(d) {
          return d.note;
        })
        .style("fill", function(d) {
          return d.color;
        })
        .on("mouseover", d => {
          div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          div
            .html(
              d.note +
                "<br/>" +
                d.summary +
                "<br/>" +
                d.comments +
                "<br/>" +
                d.color
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          div
            .transition()
            .duration(500)
            .style("opacity", 0);
        });
    },
    LoadImage() {
      let img = new Image();
      img.src = require("../assets/testFloorPlan.jpg");
      this.image = img;
    }
  },
  computed: {
    markupData() {
      return this.$store.state.markupData;
    },
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

div.tooltip {
  position: absolute;
  text-align: left;
  width: 120px;
  height: 55px;
  padding: 2px;
  font: 10px sans-serif;
  background: lightgrey;
  border: 0px;
  border-radius: 3px;
  pointer-events: none;
}

/* .img-overlay-wrap:hover {
  transform: rotate(15deg);
} */
</style>
