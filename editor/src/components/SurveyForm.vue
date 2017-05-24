<template>
  <div style='padding:35px;'>
    <md-dialog ref='pdfDialog'>
      <md-dialog-title>
        {{ report.title }}
        <span class='md-subhead'>{{ report.subtitle }}</span>
      </md-dialog-title>
      <md-dialog-content>
        <object type="application/pdf" id='reportPlaceholder' :style='dialogStyle'></object>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class='md-raised md-accent' @click.native="$refs.pdfDialog.close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-dialog ref='messageDialog'>
      <md-dialog-title v-if="message.title">
        {{ message.title }}
      </md-dialog-title>
      <md-dialog-content v-if="message.content">
        {{ message.content }}
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click.native='closeMessageDialog'>Acknowledge</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog ref='formDialog'>
      <md-dialog-title>
        {{ report.title }}
      </md-dialog-title>
      <md-dialog-content>
        <div id='surveyContainer' v-if="survey">
          <survey :survey='survey'></survey>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class='md-raised md-accent' @click.native="$refs.formDialog.close()">Close</md-button>
        <md-button class='md-raised md-accent' @click.native="survey.doNextPage">Next</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-table-card style='padding:30px;'>
      <md-toolbar md-theme='sub' class='md-transparent'>
        <h3 style='margin-left:150px;flex: 1'>
          {{ report.title || 'Report Creator' }}
          <span class='md-subhead'>{{ report.subtitle }}</span>
        </h3>
  
        <md-menu md-size="1" md-direction='bottom left' md-align-trigger>
          <md-button class='md-icon-button' md-menu-trigger>
            <md-icon>settings</md-icon>
          </md-button>
          <md-menu-content style='width:200px;'>
            <md-menu-item @selected='removeReport'>
              <span>Delete Report</span>
              <md-icon>delete</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar>
      
      <form novalidate @submit.stop.prevent='saveProperties'>
        <md-input-container v-if="report._id">
          <label>Id</label>
          <md-input :value="report._id" readonly></md-input>
        </md-input-container>
        
        <md-input-container>
          <label>{{ report.title || 'Report Title' }}</label>
          <md-input v-model='form.title' required></md-input>
        </md-input-container>
  
        <md-input-container>
          <label>{{ report.subtitle || 'Subtitle' }}</label>
          <md-input v-model='form.subtitle'></md-input>
        </md-input-container>          
  
        <md-input-container>
          <label>{{ report.comments | substring(20, 'Comments') }}</label>
          <md-textarea v-model='form.comments'></md-textarea>
        </md-input-container>

        <md-input-container>
          <label>Report Type</label>
          <md-select name='survey' :value='selectedSurveyId' @input='setFormSurvey'>
            <md-option value='' disabled>-- select survey --</md-option>
            <div v-for='(opt, idx) in surveys' key='idx'>
              <md-option :value='opt._id'>{{ opt.title }}</md-option>
            </div>
          </md-select>
        </md-input-container>

        <md-button class='md-raised md-primary' type='submit'>Save Report</md-button>
        <md-button class='md-raised md-accent' type='button' @click.native='openReportDialog' :disabled='!selectedSurvey'>Show Report Form</md-button>
        <md-button class='md-raised md-accent' type='button' @click.native='previewPDF' :enabled='(report && report.render)'>View PDF</md-button>
      </form>
    </md-table-card>
  </div>
</template>

<script>
  // import 'bootstrap'
  // import 'bootstrap/dist/css/bootstrap.css'
  // import 'surveyjs-editor/surveyeditor.css'
  // import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
  // import 'bootstrap-material-design/dist/css/ripples.min.css'
  // Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-green";
  // Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-default my-rating";
  import jsreport from 'jsreport-browser-client-dist/jsreport.js'
  import { Survey, Model } from 'survey-vue/survey.vue.js'
  import { ReportTypes, SurveyTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { substring } from '@/lib/substring'

  jsreport.serverUrl = '/templates'
  Survey.cssType = 'bootstrap'

  export default {
    name: 'SurveyForm',
    data () {
      return {
        survey: null,
        pdf: null,
        form: {
          title: undefined,
          subtitle: undefined,
          comments: undefined,
          survey: undefined
        },
        message: {}
      }
    },
    filters: {
      substring: substring
    },
    computed: {
      ...mapGetters({
        report: ReportTypes.active,
        selectedSurvey: ReportTypes.activeReportSurvey,
        surveyJson: ReportTypes.activeReportSurveyJson,
        reportJson: ReportTypes.activeReportJson,
        surveys: SurveyTypes.findAll
      }),
      dialogStyle () {
        return { height: window.innerHeight + 'px', width: window.innerWidth + 'px' }
      },
      selectedSurveyId () {
        return this.selectedSurvey ? this.selectedSurvey._id : ''
      }
    },
    methods: {
      saveProperties (e) {
        this.$store.dispatch(ReportTypes.save, Object.assign({}, this.report, this.form))
      },
      saveSurvey (e) {
        this.$store.dispatch(ReportTypes.save, Object.assign({}, { _id: this.report._id, _etag: this.report._etag }, { report_json: JSON.stringify(e.data) }))
      },
      setFormSurvey (e) {
        this.form.survey = e
      },
      buildSurvey () {
        let surveyData = this.surveyJson || { title: 'Loading Survey...' }
        let reportData = this.reportJson || {}
        let saveCallback = this.saveSurvey
        let survey = new Model(surveyData)

        survey.css.navigationButton = 'btn btn-primary'
        survey.data = reportData
        survey.onComplete.add(saveCallback)
        survey.onValueChanged.add(saveCallback)
        return survey
      },
      previewPDF () {
        let request = {
          template: {
            _id: this.selectedSurvey.render
          },
          data: this.report.report_json
        }
        this.$refs.pdfDialog.open()

        jsreport.renderAsync(request).then(function (resp) {
          let el = document.getElementById('reportPlaceholder')
          el.data = resp.toDataURI()
        }).catch(function (err) {
          console.warn('Error getting report pdf', err)
        })
      },
      downloadPDF () {
        let filename = this.report.title.replace(/[\s.]+/g, '_') + '.pdf'
        let request = {
          template: {
            _id: this.selectedSurvey.render
          },
          data: this.report.report_json
        }
        jsreport.download(filename, request)
      },
      openReportDialog () {
        this.$refs.formDialog.open()
      },
      closeMessageDialog () {
        this.$refs.messageDialog.close()
        this.message = {}
      },
      removeReport () {
        let a = confirm('Are you sure you want to permanently delete this report: ' + this.report.title + '?')
        if (a) {
          this.$store.dispatch(ReportTypes.remove, this.report)
          this.$router.back()
        }
      },
      failMessage (title, content) {
        this.message = { title: title || 'Oops!', content: content || 'Something went wrong' }
        this.$refs.messageDialog.open()
      }
    },
    beforeUpdate () {
      if (this.report && this.selectedSurvey && this.reportJson) {
        if (!this.survey) {
          console.log('building survey...')
          this.survey = this.buildSurvey()
        }
      } else {
        this.survey = null
      }
    },
    mounted () {
      window.self = this
      this.$store.dispatch(SurveyTypes.findAll)

      let id = this.$route.params.id
      if (id) {
        this.$store.dispatch(ReportTypes.find, id)
      } else {
        this.failMessage('Oops!', 'No Id parameter provided!')
      }
    },
    components: {
      Survey
    }
  }
</script>
