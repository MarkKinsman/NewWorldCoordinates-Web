<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      placeholder="Type to Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      v-if="webMarkups.length > 0"
      :headers="headers"
      :items="webMarkups"
      :search="search"
      item-key="markup_id"
      class="elevation-1"
      select-all
      v-model="selected"
    >
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.markup_id }}</td>
          <td class="text-xs-left">{{ props.item.data.Note }}</td>
          <td class="text-xs-left">{{ props.item.status }}</td>
          <td class="text-xs-left">{{ props.item.creator }}</td>
        </tr>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>

    <div class="grid-container">
      <div class="grid-item">
        <PieChart canvasId="testA" title="Open Issues" :data="openIssuesSample"></PieChart>
      </div>
      <div class="grid-item">
        <PieChart canvasId="testB" title="Construction/Design" :data="openIssuesData"></PieChart>
      </div>
      <div class="grid-item">
        <PieChart canvasId="testC" title="Projects" :data="sampleData"></PieChart>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart";

const request = require("request");

export default {
  name: "DataTable",
  components: {
    PieChart
  },
  data: () => ({
    selected: [],
    search: "",
    getInterval: 5000,
    openIssues: 0,
    closedIssues: 0,
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: false,
        value: "markup_id"
      },
      { text: "Note", value: "note", align: "left" },
      { text: "Status", value: "status", align: "left" },
      { text: "Creator", value: "creator", align: "left" }
    ],
    webMarkups: []
  }),
  mounted() {
    this.GetMarkupData();
    // this.interval = setInterval(() => this.GetMarkupData(), this.getInterval);
    this.$store.commit("setMarkupData", this.webMarkups);
  },
  watch: {
    webMarkups: function(val) {
      this.$store.commit("setMarkupData", val);
    }
  },
  computed: {
    sampleData() {
      return {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#E9967A", "#F5DEB3", "#9ACD32"]
          }
        ],
        labels: ["Red", "Yellow", "Green"]
      };
    },
    openIssuesSample() {
      return {
        datasets: [
          {
            data: [10, 20],
            backgroundColor: ["#E9967A", "#9ACD32"]
          }
        ],
        labels: ["Open", "Closed"]
      };
    },
    openIssuesData() {
      const self = this;
      var closed = 0;
      var open = 0;
      this.webMarkups.map(m => {
        if (m.status == "Open") {
          open++;
        } else {
          closed++;
        }
      });
      this.closedIssues = closed;
      this.openIssues = open;
      var tempData = [closed, open];

      var temp = {
        datasets: [
          {
            data: [this.$data.openIssues, this.$data.closedIssues],
            backgroundColor: ["#E9967A", "#9ACD32"]
          }
        ],
        labels: ["Red", "Green"]
      };
      // temp.datasets[0].data = tempData;
      return temp;
    }
  },
  methods: {
    GetMarkupData() {
      let self = this;
      var options = {
        method: "POST",
        url: "http://nwc.virtual-insights.com/v1/markups",
        headers: {
          "cache-control": "no-cache",
          Connection: "keep-alive",
          "accept-encoding": "gzip, deflate",
          Host: "nwc.virtual-insights.com",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: { version_id: "1" }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        let data = JSON.parse(body);
        data.map(d => {
          d.location = JSON.parse(d.location);
          d.location.x = +d.location.x;
          d.location.y = +d.location.y;
          d.location.z = +d.location.z;
          d.data = JSON.parse(d.data);
          d.color = d.data.Color;
          d.note = d.data.Note;
        });
        console.log("API DATA", data);
        self.webMarkups = data;
      });
    }
  }
};
</script>

<style>
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 5px;
}
</style>
