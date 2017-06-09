<template>
  <v-select :label='label' :items='items' :value='value' :item-text='textfield' :item-value='valuefield' @input='inputChanged' multiple chips dark max-height='auto' autocomplete>
    <template slot='selection' scope='data'>
      <v-chip close @input='data.parent.selectItem(data.item)' @click.native.stop class='chip--select-multi' :key='data.item'>{{ data.item.name }}</v-chip>
    </template>
    <template slot='item' scope='data'>
      <v-list-tile-content v-html='data.item.name'></v-list-tile-content>
    </template>
  </v-select>
</template>

<script>
  export default {
    name: 'TextInput',
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      textfield: {
        type: String,
        default: 'name'
      },
      valuefield: {
        type: String,
        default: '_id'
      },
      label: {
        type: String,
        default: 'Select'
      }
    },
    data () {
      return {}
    },
    methods: {
      inputChanged (val) {
        this.$emit('input', val, this.name)
      }
    }
  }
</script>
