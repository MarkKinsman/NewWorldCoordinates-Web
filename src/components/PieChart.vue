<template>
  <canvas id="myChart" width="200" height="200"></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "PieChart",
  data: () => ({}),
  mounted() {
    this.DrawChart();
  },
  methods: {
    DrawChart() {
      var ctx = document.getElementById("myChart");
      var data = {
        datasets: [
          {
            data: [10, 20, 30]
          }
        ],
        labels: ["Red", "Yellow", "Blue"]
      };
      var myDoughnutChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options
      });
    }
  }
};
</script>

<style>
</style>
