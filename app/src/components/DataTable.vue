<template>
  <v-card :class='color'>
    <v-card-title v-if='title'>
      <v-toolbar class="transparent elevation-0" light>
        <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if='actions'>
          <v-toolbar-item v-for='(action, index) in actions' key='index'>
            <v-btn @click.native='buttonClicked(action)'>
              <v-icon v-if='action.icon'>{{ action.icon }}</v-icon>
              <span v-if='action.text'>{{ action.text }}</span>
            </v-btn>
          </v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-data-table v-bind:headers="headers" :items="items" v-model="selected" selected-key="name" select-all hide-actions>
        <template slot="items" scope="props">
          <td>
            <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
          </td>
          <td v-for='header in headers' :key='header.value'>{{ props.item[header.value] }}</td>
          <td v-if='recordActions'>
            <v-btn v-for='(action, index) in recordActions(props.item)' key='index' icon :class='action.color || "primary"' :title='action.help' @click.native='action.click'>
              <v-icon>{{ action.icon }}</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      color: {},
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
      },
      recordActions: {
        type: Function
      }
    },
    data () {
      return {
        selected: []
      }
    },
    methods: {
      buttonClicked (action) {
        if (action.route) {
          this.$router.push(action.route)
        } else if (action.click) {
          action.click.apply(this)
        }
      }
    }
  }
</script>
