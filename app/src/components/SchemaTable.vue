<template>
  <div>
    <h3>Schema table</h3>
    <v-text-field v-if='title' v-model="title"></v-text-field>
    
    <v-data-table :headers='headers' :items='items' hide-actions class='elevation-1'>
      <template slot='items' scope='props'>
        <td v-for='header in headers' :key='header.value'>{{ props.item[header.value] }}
        </td>
      </template>
    </v-data-table>
    
  </div>
</template>

<script>
  export default {
    name: 'SchemaTable',
    props: {
      value: {
        type: Object,
        required: true
      },
      headers: {
        type: Array,
        default () {
          return [
            {
              text: 'Field Name',
              left: true,
              sortable: true,
              value: 'key'
            },
            {
              text: 'Type',
              left: true,
              sortable: true,
              value: 'type'
            },
            {
              text: 'Tag Name',
              left: true,
              sortable: true,
              value: 'tag'
            },
            {
              text: 'Description',
              left: true,
              sortable: true,
              value: 'description'
            },
            {
              text: 'Pattern',
              left: true,
              sortable: false,
              value: 'pattern'
            }
          ]
        }
      }
    },
    data () {
      return {
        title: '',
        items: []
      }
    },
    methods: {
      computeItems () {
        let schema = this.value
        let title = schema.title
        let items = []

        for (let key in schema.properties) {
          let val = schema.properties[key]
          // let item = { key: key, type: type, tag: val.tag, description: val.description, required: schema.required.indexOf(key) >= 0 }
          let item = Object.assign({}, val, { key: key, required: schema.required.indexOf(key) >= 0 })
          items.push(item)
        }

        this.items = items
        this.title = title
      },
      getType (item) {
        if (Array.isArray(item)) {
          return 'array'
        } else {
          let t = typeof item
          return t
        }
      }
    },
    mounted () {
      this.computeItems()
    },
    watch: {
      value () {
        this.computeItems()
      }
    }
  }
</script>
