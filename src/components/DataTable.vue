<template>
  <v-data-table
    :headers="headers"
    :items="markups"
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
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.summary }}</td>
        <td class="text-xs-left">{{ props.item.location }}</td>
        <td class="text-xs-left">{{ props.item.comments }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  data: () => ({
    selected: [],
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: false,
        value: "id"
      },
      { text: "Summary", value: "summary", align: "left" },
      { text: "Location", value: "location", align: "left" },
      { text: "Comments", value: "comments", align: "left" }
    ],
    markups: [
      {
        id: "X1",
        summary: "An issue",
        comments: "Stuff is messed up",
        location: [70, 125, 0],
        x_axis: 70,
        y_axis: 125,
        radius: 10,
        color: "purple",
        note: "sample"
      },
      {
        id: "X2",
        summary: "Another issue",
        comments: "Concrete in wrong place",
        location: [110, 100, 0],
        x_axis: 110,
        y_axis: 100,
        color: "red",
        note: "sample"
      },
      {
        id: "X3",
        summary: "An issue",
        comments: "Steel has melted",
        location: [300, 200, 0],
        x_axis: 300,
        y_axis: 200,
        color: "red",
        note: "sample"
      }
    ]
  }),
  mounted() {
    this.$store.commit("setMarkupData", this.markups);
  },
  watch: {
    markups: function(val) {
      this.$store.commit("setMarkupData", val);
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
