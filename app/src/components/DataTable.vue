<template>
  <v-card class='blue darken-1 white--text mt-3'>
    <v-card-title v-if='title'>
      <v-toolbar class="transparent elevation-0" light>
        <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if='actions'>
          <v-toolbar-item v-for='(action, index) in actions' key='index'>
            <v-btn @click.native='$router.push(action.route)'>
              <v-icon v-if='action.icon'>{{ action.icon }}</v-icon>
              <span v-if='action.text'>{{ action.text }}</span>
            </v-btn>
          </v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table v-bind:headers="headers" :items="items" hide-actions class="blue ligthen-4 dark--text elevation-20">
        <template slot="items" scope="props">
          <td v-for='header in headers' :key='header.value'>{{ props.item[header.value] }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      title: {},
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      actions: {
        type: Array
      }
    },
    data () {
      return {}
    }
  }
</script>
