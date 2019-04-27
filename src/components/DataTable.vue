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
        location: [23, 98, 10]
      },
      {
        id: "X2",
        summary: "Another issue",
        comments: "Concrete in wrong place",
        location: [5, 33, 5]
      },
      {
        id: "X3",
        summary: "An issue",
        comments: "Steel has melted",
        location: [85, 27, 15]
      }
    ]
  })
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
