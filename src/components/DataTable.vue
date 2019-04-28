<template>
  <v-data-table
    v-if="webMarkups.length > 0"
    :headers="headers"
    :items="webMarkups"
    item-key="id"
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
  </v-data-table>
</template>

<script>
const request = require("request");

export default {
  name: "DataTable",
  data: () => ({
    selected: [],
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
    markups: [
      {
        id: "X1",
        summary: "Studs placed at wrong spacing.",
        comments: "Stuff is messed up.",
        location: [70, 125, 0],
        x_axis: 70,
        y_axis: 125,
        radius: 10,
        color: "purple",
        note: "Revise before RFI #23."
      },
      {
        id: "X2",
        summary: "Concrete pour QA/QC issue.",
        comments: "Concrete in wrong place.",
        location: [110, 100, 0],
        x_axis: 110,
        y_axis: 100,
        color: "red",
        note: "Never use WG Clark Construction again."
      },
      {
        id: "X3",
        summary: "Steel member failure.",
        comments: "Steel has melted.",
        location: [300, 200, 0],
        x_axis: 300,
        y_axis: 200,
        color: "red",
        note: "Don't let WG Clark Construction install steel again."
      }
    ],
    webMarkups: []
  }),
  mounted() {
    this.$store.commit("setMarkupData", this.webMarkups);
    this.GetMarkupData();
  },
  watch: {
    webMarkups: function(val) {
      this.$store.commit("setMarkupData", val);
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
          "content-length": "12",
          "accept-encoding": "gzip, deflate",
          Host: "nwc.virtual-insights.com",
          "Postman-Token":
            "983ae45a-b01b-4610-bb1b-dace74668c2f,8058da64-334d-484a-a5db-0985cff44afb",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          "User-Agent": "PostmanRuntime/7.11.0",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: { version_id: "1" }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        let data = JSON.parse(body);
        data.map(d => {
          console.log(d);
          d.location = JSON.parse(d.location);
          d.location.x = +d.location.x;
          d.location.y = +d.location.y;
          d.location.z = +d.location.z;
          d.data = JSON.parse(d.data);
          d.color = d.data.Color;
          d.note = d.data.Note;
        });

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
</style>
