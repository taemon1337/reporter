<template>
  <div style='padding:35px;'>
    <md-table-card>
      <md-toolbar>
        <h1 class="md-title">Reports</h1>
        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>
    
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>
      <md-table v-once>
        <md-table-header>
          <md-table-row>
            <md-table-head>Title</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Last Updated</md-table-head>
            <md-table-head>Actions</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="(record, index) in records" key="index">
            <md-table-cell>{{ record.title }}</md-table-cell>
            <md-table-cell>{{ record.version }}</md-table-cell>
            <md-table-cell>{{ record.description }}</md-table-cell>
            <md-table-cell>{{ record._updated_at }}</md-table-cell>
            <md-table-cell>
              <md-icon>edit</md-icon>
              <md-icon>insert_comment</md-icon>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>
  </div>
</template>

<script>
  import { ReportTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ReportPage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        records: ReportTypes.findAll
      })
    }
  }
</script>
