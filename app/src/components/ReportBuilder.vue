<template>
  <v-layout style='padding:10px;min-height:500px;'>
    <v-flex xs12 sm9>
      <v-toolbar class="transparent elevation-0">
        <v-toolbar-title class="hidden-sm-and-down">Report Builder</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-toolbar-item>
            <v-btn icon>
              <v-icon>content_cut</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>content_paste</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>content_copy</v-icon>
            </v-btn>
          </v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
      
      <div class='dashed'>
        <h2 style='text-align:center;color:#e9e9e9;'>DROP LAYOUTS HERE</h2>
      </div>
      
    </v-flex>
    <v-flex xs12 sm3 style='border-left:4px solid #e9e9e9;'>
      <v-card>
        <v-toolbar :class="color" light>
          <v-toolbar-title>Select Layout</v-toolbar-title>
          <v-btn light icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template>
            <v-list-item v-for="(layout, index) in layouts" key='index'>
              <v-list-tile avatar>
                <v-list-tile-avatar v-if='layout.avatar'>
                  <img v-bind:src="layout.avatar"></v-list-tile-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="layout.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="layout.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LayoutTypes } from '@/store/mutation-types'

  export default {
    name: 'ReportBuilder',
    props: {
      value: {
        type: Object,
        required: true
      },
      color: {
        type: String
      }
    },
    data () {
      return {
        drawer: true,
        drawerRight: true,
        right: null,
        left: null
      }
    },
    computed: {
      ...mapGetters({
        layouts: LayoutTypes.findAll,
        activeLayout: LayoutTypes.active
      })
    },
    methods: {
      emitInput () {
        this.$emit('input', this.value)
      }
    },
    mounted () {
      this.$store.dispatch(LayoutTypes.findAll)
    }
  }
</script>

<style>
  .dashed {
    border: 3px dashed #e9e9e9;
    width:100%;
  }
</style>
