<template>
  <v-container style="padding: 15px">
    <canvas :id="canvasId" width="100" height="100" @click="Update"></canvas>
  </v-container>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "PieChart",
  props: ["canvasId", "title", "dataObj"],
  data: () => ({
    chart: null
  }),
  mounted() {
    this.DrawChart();
    this.chart.update();
  },
  methods: {
    DrawChart() {
      let self = this;
      var options = {
        responsive: true,
        title: {
          display: true,
          position: "bottom",
          text: self.title,
          fontSize: 20,
          fontColor: "#111"
        },
        tooltips: {
          titleFontSize: 20,
          bodyFontSize: 15
        },
        legend: {
          display: true,
          position: "bottom",
          fullWidth: false,
          labels: {
            fontColor: "#333",
            fontSize: 14,
            boxWidth: 20
          }
        }
      };
      var ctx = document.getElementById(self.canvasId);
      var chart = new Chart(ctx, {
        type: "doughnut",
        data: self.dataObj,
        options: options
      });
      this.$data.chart = chart;
    },
    Update() {
      console.log("TRIED TO UPDATE CHART");
      this.chart.update();
    }
  }
};
</script>

<style>
canvas {
  width: 150px !important;
  height: 150px !important;
}
</style>