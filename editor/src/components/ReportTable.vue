<template>
  <md-table-card>
    <md-toolbar>
      <h1 class="md-title">
        <router-link to="reports">Reports</router-link>
      </h1>
      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>
  
      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
    </md-toolbar>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="(header, index) in _headers" key="index">{{ header.name }}</md-table-head>
          <md-table-head>Actions</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(record, index) in records" key="index">
          <md-table-cell v-for="(header, headerIndex) in _headers" key="headerIndex">
            {{ record[header.field] }}
          </md-table-cell>
          <md-table-cell>
            <router-link :to="{ name: 'report', params: { id: record._id }}">
              <md-icon>edit</md-icon>
            </router-link>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-table-card>
</template>

<script>
  import { ReportTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { parseHeaders } from '@/lib/parse-headers'

  export default {
    name: 'ReportTable',
    props: {
      hidden: {
        default: function () { return [] }
      },
      headers: {
        default: function () { return ['title', 'version', 'description', { name: 'Last updated', field: '_updated' }] }
      },
      max_results: {
        default: 10
      },
      page: {
        default: 0
      },
      sort: {
        default: null
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        records: ReportTypes.findAll
      }),
      _headers () {
        return parseHeaders(this.headers, this.hidden)
      }
    },
    methods: {
      filter (opts) {
        let def = { params: { max_results: this.max_results, page: this.page, sort: this.sort } }
        this.$store.dispatch(ReportTypes.findAll, Object.assign({}, def, opts))
      }
    },
    created () {
      this.filter()
    }
  }
</script>
