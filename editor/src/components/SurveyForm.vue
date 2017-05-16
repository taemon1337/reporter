<template>
  <div style='padding:35px;'>
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
      <md-dialog-title>{{ report.title }}</md-dialog-title>
      <md-dialog-content>
        <div id='surveyContainer' v-if="survey">
          <survey :survey='survey'></survey>
        </div>
      </md-dialog-content>
    </md-dialog>
    
    <md-toolbar md-theme='sub' class='md-transparent'>
      <h2 class="md-title">
        {{ report.title }}
      </h2>
      
      <md-button class='md-raised md-primary' @click.native='saveProperties' :disabled='!report._id'>Save Report</md-button>
      
      <h3 style='margin-left:150px;flex: 1'>Report Creator</h3>

      <md-menu md-size="1" md-direction='bottom left' md-align-trigger>
        <md-button class='md-icon-button' md-menu-trigger>
          <md-icon>settings</md-icon>
        </md-button>
        <md-menu-content style='width:200px;'>
          <md-menu-item @selected='removeSurvey'>
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
        <label>Report Title</label>
        <md-input v-model='report.title'></md-input>
      </md-input-container>

      <md-input-container>
        <label>Subtitle</label>
        <md-input v-model='report.subtitle'></md-input>
      </md-input-container>          

      <md-input-container>
        <label>Comments</label>
        <md-textarea v-model='report.comments'></md-textarea>
      </md-input-container>
      
      <md-button class='md-raised md-primary' type='submit'>Save Properties</md-button>
      <md-button class='md-raised md-accent' type='button' @click.native='openReportDialog'>Start Report</md-button>
    </form>
  </div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'
  import { Survey, Model } from 'survey-vue/survey.vue.js'
  import { ReportTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  Survey.cssType = 'bootstrap'

  export default {
    name: 'SurveyForm',
    data () {
      return {
        survey: null,
        message: {}
      }
    },
    computed: {
      ...mapGetters({
        report: ReportTypes.active
      })
    },
    methods: {
      saveProperties (e) {
        this.$store.dispatch(ReportTypes.save, Object.assign({}, this.report))
      },
      openReportDialog () {
        this.$refs.formDialog.open()
      },
      closeMessageDialog () {
        this.$refs.messageDialog.close()
        this.message = {}
      },
      mountSurvey () {
        this.survey = new Model(this.report.report_json)
        this.survey.css.navigationButton = 'btn btn-primary'
        this.survey.showTitle = false
      },
      removeSurvey () {
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
    updated () {
      this.mountSurvey()
    },
    mounted () {
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
