<template>
  <v-container style="padding: 5px">
    <div ref="planImg" id="planImg" class="img-overlay-wrap">
      <img v-if="image !=null" :src="image.src" id="plan">
      <svg viewBox="0 0 573 573"></svg>
    </div>
    <ModalDetail
      :creator="modalData.creator"
      :status="modalData.status"
      :comments="modalData.note"
      :color="modalData.color"
    />
  </v-container>
</template>

<script>
import ModalDetail from "./ModalDetail";
import { Promise } from "q";
var d3 = require("d3");

export default {
  name: "FloorPlan",
  components: {
    ModalDetail
  },
  data: () => ({
    image: null,
    modalData: {},
    modal: false
  }),
  mounted() {
    this.LoadImage().then(img => {
      console.log("IMAGE HEIGHT", img.height);
      console.log("IMAGE WIDTH", img.width);
      this.DrawChart();
    });
  },
  methods: {
    SetModalData(data) {
      self.modalData = data;
      self.modal = true;
      console.log("CLICKED DATA", data);
    },
    DrawChart() {
      let self = this;
      const div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var svgContainer = d3.select("svg");

      var circles = svgContainer
        .selectAll("circle")
        .data(this.markupData)
        .enter()
        .append("circle");

      circles
        .attr("cx", d => {
          return d.location.x;
        })
        .attr("cy", d => {
          return d.location.y;
        })
        .attr("r", () => {
          return 10;
        })
        .attr("note", d => {
          return d.note;
        })
        .style("fill", d => {
          return d.color;
        })
        .on("mouseover", d => {
          div
            .transition()
            .duration(200)
            .style("cursor", "pointer")
            .style("opacity", 0.9);
          div
            .html(d.status + "<br/>" + d.note)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          div
            .transition()
            .duration(500)
            .style("cursor", "default")
            .style("opacity", 0);
        })
        .on("click", d => {
          self.SetModalData(d);
          self.modalData = d;
          self.modal = true;
          this.$store.commit("setModal", true);
        });
    },
    LoadImage() {
      return new Promise(resolve => {
        let img = new Image();
        img.src = require("../assets/testFloorPlan.jpg");
        this.image = img;
        resolve(img);
      });
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
  },
  watch: {
    modal: function(val) {
      this.$store.commit("setModal", val);
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
  height: 35px;
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
