<template>
  <v-container style="padding: 15px">
    <canvas :id="canvasId" width="100" height="100"></canvas>
  </v-container>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "PieChart",
  props: ["canvasId", "title"],
  data: () => ({}),
  mounted() {
    this.DrawChart();
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
      var data = {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#E9967A", "#F5DEB3", "#9ACD32"]
          }
        ],
        labels: ["Red", "Yellow", "Green"]
      };
      new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options
      });
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