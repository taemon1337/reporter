<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for='(report, index) in reports' :key='report._id'>
        <v-card :class='reportColor.primary + "mt-3"'>
          <v-card-title>
            <router-link tag='h3' :to='"/reports/" + report._id'>
              {{ report.title }}
            </router-link>
          </v-card-title>
          <v-card-text>
            {{ report.description }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { ReportTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ReportsPage',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        reports: ReportTypes.findAll,
        reportColor: GlobalTypes.reportColor
      })
    },
    methods: {
      goto (report) {
        console.log('GOING TO', report)
      }
    },
    created () {
      this.$store.dispatch(ReportTypes.findAll)
    },
    components: {
    }
  }
</script>
