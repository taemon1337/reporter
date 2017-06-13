<template>
  <div>
    <edit-frame :title='computedTitle' :schema='computedReportSchema' :record='report' :cache='cache' @save='save' @remove='removeRecord' :color='reportColor.primary'>
      <div slot='drawer'>
        <about-report :color='reportColor.primary'></about-report>
      </div>
      <div slot='content'>
        <v-tabs light style='min-width:400px;'>
          <v-tabs-bar :class='reportColor.primary' slot='activators'>
            <v-tabs-slider :class='reportColor.dark'></v-tabs-slider>
            <v-tabs-item ripple href='#builder'>Designer</v-tabs-item>
            <v-tabs-item ripple href='#dataentry'>Data Entry</v-tabs-item>
            <v-tabs-item ripple href='#preview'>Live Preview</v-tabs-item>
            <v-tabs-item ripple href='#properties'>Properties</v-tabs-item>
          </v-tabs-bar>
          <v-tabs-content id='builder'>
            <v-layout>
              <v-flex xs12>
                <report-builder :value='cache' :color='reportColor.primary' @input='saveRecord'></report-builder>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id='dataentry'>
            <v-layout>
              <v-flex xs12>
                <schema-form :schema='computedReportSchema' v-model='computedReportJson' @input='saveReportJson'></schema-form>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id='preview'>
            <v-layout row>
              <v-flex xs12 class='pa-3'>
                <h3>Live Preview</h3>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id='properties'>
            <v-layout row>
              <v-flex xs12>
                <schema-form :schema='computedReportSchema' v-model='cache' @input='saveRecord'></schema-form>
              </v-flex>
            </v-layout>
          </v-tabs-content>
        </v-tabs>
      </div>
    </edit-frame>
  </div>
</template>

<script>
  import EditFrame from '@/components/EditFrame'
  import SchemaForm from 'sf/SchemaForm'
  import AboutReport from '@/components/About/AboutReport'
  import ReportBuilder from '@/components/ReportBuilder'
  import { SchemeTypes, ReportTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { capitalize } from '@/lib/capitalize'

  export default {
    name: 'EditReportPage',
    props: ['id'],
    data () {
      return {
        cache: {
          report_json: '{}'
        }
      }
    },
    computed: {
      ...mapGetters({
        report: ReportTypes.active,
        reportSchema: SchemeTypes.reportSchema,
        reportColor: GlobalTypes.reportColor
      }),
      computedTitle () {
        return 'Edit ' + capitalize(this.report.title)
      },
      computedReportSchema () {
        return this.reportSchema ? this.reportSchema.jsonschema : {}
      },
      computedReportJson () {
        try {
          return JSON.parse(this.cache.report_json || '{}')
        } catch (err) {
          console.warn('Error parsing report_json', err)
        }
      }
    },
    methods: {
      removeRecord () {
        this.$store.dispatch(ReportTypes.remove, this.report)
        process.nextTick(function () { self.$router.back() })
      },
      save () {
        let self = this
        process.nextTick(function () {
          self.$store.dispatch(ReportTypes.save, self.cache)
        })
      },
      saveRecord (record) {
        this.cache = record
      },
      saveReportJson (reportJson) {
        this.cache.report_json = JSON.stringify(reportJson)
      }
    },
    mounted () {
      this.cache = Object.assign({}, this.report)
      this.$store.dispatch(SchemeTypes.findAll)
      // this.$store.dispatch(ReportTypes.findAll)
      this.$store.dispatch(ReportTypes.find, this.$route.params.id)
    },
    watch: {
      report () {
        this.cache = Object.assign({}, this.report)
      }
    },
    components: {
      EditFrame,
      SchemaForm,
      AboutReport,
      ReportBuilder
    }
  }
</script>
