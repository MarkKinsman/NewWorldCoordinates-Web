<template>
  <!-- <canvas id="myChart" width="200" height="200"></canvas> -->
  <div id="chart"></div>
</template>

<script>
var d3 = require("d3");

export default {
  name: "PieChart",
  data: () => ({}),
  mounted() {
    this.DrawChart();
  },
  methods: {
    DrawChart() {
      var data = [
        { name: "USA", value: 40 },
        { name: "UK", value: 20 },
        { name: "Canada", value: 30 },
        { name: "Maxico", value: 10 }
      ];
      var text = "";
      var width = 100;
      var height = 100;
      var thickness = 40;
      var radius = Math.min(width, height) / 2;
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("class", "pie")
        .attr("width", width)
        .attr("height", height);
      var g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      var arc = d3
        .arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);
      var pie = d3
        .pie()
        .value(function(d) {
          return d.value;
        })
        .sort(null);
      var path = g
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("g")
        .on("mouseover", function(d) {
          let g = d3
            .select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");
          g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr("text-anchor", "middle")
            .attr("dy", "-1.2em");
          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr("text-anchor", "middle")
            .attr("dy", ".6em");
        })
        .on("mouseout", () => {
          d3.select(this)
            .style("cursor", "none")
            // .style("fill", color(this._current))
            .style("opacity", 0)
            .select(".text-group")
            .remove();
        })
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .on("mouseover", () => {
          d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black");
        })
        .on("mouseout", () => {
          d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current));
        })
        .each(function(d, i) {
          this._current = i;
        });
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(text);
    }
  }
};
</script>

<style>
.pie {
  margin: 20px;
}

.pie text {
  font-family: "Verdana";
  fill: #888;
}

.pie .name-text {
  font-size: 1em;
}

.pie .value-text {
  font-size: 3em;
}
</style>
