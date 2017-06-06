<template>
  <v-layout>
    <v-flex xs12>
      <v-dialog v-model="previewing">
        <v-card v-if='preview && previewing' style='width:600px;'>
          <v-card-row>
            <v-card-title>{{ preview.name }} Preview</v-card-title>
          </v-card-row>
          <v-card-row>
            <layout-render :layout='preview.template'></layout-render>
          </v-card-row>
          <v-card-row actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="previewing = false">Close</v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>

      </v-dialog>
      <v-layout row>
        <v-flex xs12>
          <data-table title='Current Layouts' :headers='headers' :items='items' :actions='actions' :recordActions='recordActions' :color='color.primary'></data-table>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import DataTable from '@/components/DataTable'
  import LayoutRender from '@/components/LayoutRender'
  import { mapGetters } from 'vuex'
  import { LayoutTypes, GlobalTypes } from '@/store/mutation-types'

  export default {
    name: 'LayoutsPage',
    data () {
      return {
        previewing: false,
        preview: null,
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
        items: LayoutTypes.findAll,
        color: GlobalTypes.layoutColor
      })
    },
    methods: {
      recordActions (item) {
        let self = this
        return [
          {
            icon: 'edit',
            color: 'lime darken-2 white--text',
            help: 'Edit ' + item.name,
            click: function () { self.$router.push('/layouts/' + item._id) }
          },
          {
            icon: 'present_to_all',
            color: 'lime darken-2 white--text',
            help: 'Preview',
            click: function () {
              self.preview = Object.assign({}, item)
              process.nextTick(function () {
                self.previewing = true
              })
            }
          }
        ]
      }
    },
    mounted () {
      this.$store.dispatch(LayoutTypes.findAll)
    },
    components: {
      LayoutRender,
      DataTable
    }
  }
</script>
