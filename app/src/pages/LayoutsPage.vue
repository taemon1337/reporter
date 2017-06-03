<template>
  <v-layout row>
    <v-flex xs12>
      <data-table title='Current Layouts' :headers='headers' :items='items' :actions='actions'></data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import DataTable from '@/components/DataTable'
  import { mapGetters } from 'vuex'
  import { LayoutTypes } from '@/store/mutation-types'

  export default {
    name: 'LayoutsPage',
    data () {
      return {
        headers: [
          { text: 'Id', value: '_id', left: true, sortable: true },
          { text: 'Name', value: 'name', left: true, sortable: true },
          { text: 'Version', value: 'version', left: true, sortable: true }
        ],
        actions: [
          {
            text: 'Create Layout',
            icon: 'add',
            route: '/layouts/new'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        items: LayoutTypes.findAll
      })
    },
    mounted () {
      this.$store.dispatch(LayoutTypes.findAll)
    },
    components: {
      DataTable
    }
  }
</script>
