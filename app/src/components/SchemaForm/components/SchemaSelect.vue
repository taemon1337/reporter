<template>
  <v-select :label='label' :items='items' :value='selected' :item-text='textfield' :item-value='valuefield' @input='inputChanged' chips max-height='auto' autocomplete>
    <template slot='selection' scope='data'>
      <v-chip close @input='data.parent.selectItem(data.item)' @click.native.stop class='chip--select-multi' :key='data.item'>{{ data.item.name }}</v-chip>
    </template>
    <template slot="item" scope="data">
      <v-list-tile-avatar v-if="data.item.avatar">
        <img v-bind:src="data.item.avatar"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  import { SchemeTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SchemaSelect',
    props: {
      label: {
        type: String
      },
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      textfield: {
        type: String
      },
      valuefield: {
        type: String
      }
    },
    data () {
      return {
        selected: null
      }
    },
    computed: {
      ...mapGetters({
        items: SchemeTypes.findAll
      })
    },
    methods: {
      inputChanged (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
