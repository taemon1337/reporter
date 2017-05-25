<template>
  <div class='container-fluid'>
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

    <md-dialog ref='propertiesDialog'>
      <md-dialog-title>
        Edit Survey Properties
      </md-dialog-title>
      <md-dialog-content>
        <form @submit.stop.prevent='saveProperties' novalidate>
          <md-input-container v-if="survey._id">
            <label>Id</label>
            <md-input :value="survey._id" readonly></md-input>
          </md-input-container>
          
          <md-input-container>
            <label>Title</label>
            <md-input :value='survey.title' @input='setFormTitle'></md-input>
          </md-input-container>

          <md-input-container>
            <label>Version</label>
            <md-input :value='survey.version' @input='setFormVersion'></md-input>
          </md-input-container>          

          <md-input-container>
            <label>Description</label>
            <md-textarea :value='survey.description' @input='setFormDescription'></md-textarea>
          </md-input-container>
          
          <md-input-container>
            <label>Report Renderer</label>
            <md-select name='render' :value='survey.render' @input='setSurveyRender'>
              <div v-for='(opt, idx) in renders' key='idx'>
                <md-option :value='opt._id'>{{ opt.name }}</md-option>
              </div>
            </md-select>
          </md-input-container>
          
          <md-button type='submit' ref='savePropertiesButton' hidden>Save Properties</md-button>
        </form>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class='md-raised' @click.native='closePropertiesDialog'>Cancel</md-button>
        <md-button class='md-raised md-primary' @click.native='$refs.savePropertiesButton.$el.click()'>Save Survey</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-toolbar md-theme='sub' class='md-transparent'>
      <h2 class="md-title">
        <md-button @click.native='openPropertiesDialog'>{{ survey.title || 'Set Properties' }}</md-button>
      </h2>
      
      <md-button class='md-raised md-primary' @click.native='editor.saveButtonClick()' :disabled='!survey._id'>Save Survey</md-button>
      
      <h3 style='margin-left:150px;flex: 1'>Survey Designer</h3>
      
      <md-button class='md-raised md-accent' @click.native='editor.showDesigner()'>Design</md-button>
      <md-button class='md-raised md-accent' @click.native='editor.showJsonEditor()'>Edit JSON</md-button>
      <md-button class='md-raised md-accent' @click.native='editor.showTestSurvey()'>Preview</md-button>
      
      <md-button class='md-raised md-icon-button' @click.native="editor.doUndoClick" :disabled="undoable">
        <md-tooltip>Undo</md-tooltip>
        <md-icon>undo</md-icon>
      </md-button>
      <md-button class='md-raised md-icon-button' @click.native="editor.doRedoClick">
        <md-tooltip>Redo</md-tooltip>
        <md-icon>redo</md-icon>
      </md-button>
      <md-menu md-size="1" md-direction='bottom left' md-align-trigger>
        <md-button class='md-icon-button' md-menu-trigger>
          <md-icon>settings</md-icon>
        </md-button>
        <md-menu-content style='width:200px;'>
          <md-menu-item @selected='removeSurvey'>
            <span>Delete Survey</span>
            <md-icon>delete</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <div id='editor-container'></div>
  </div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'surveyjs-editor/surveyeditor.css'
  import { SurveyEditor } from 'surveyjs-editor'
  import { SurveyTypes, RenderTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { substring } from '@/lib/substring'
  
  export default {
    name: 'survey-editor',
    data () {
      return {
        message: {},
        form: {},
        options: {
          showTestSurveyTab: false,
          generateValidJSON: true
        }
      }
    },
    computed: {
      ...mapGetters({
        survey: SurveyTypes.active,
        surveyJson: SurveyTypes.surveyJson,
        renders: RenderTypes.findAll
      }),
      undoable () {
        return this.editor && this.editor.toolbarItems()[0].enabled()
      }
    },
    filters: {
      substring: substring
    },
    methods: {
      saveProperties (e) {
        this.$store.dispatch(SurveyTypes.save, Object.assign({}, this.survey, this.form))
        this.form = Object.assign({})
        this.closePropertiesDialog()
      },
      saveSurvey (data) {
        if (this.survey._id) {
          this.$store.dispatch(SurveyTypes.save, { _id: this.survey._id, _etag: this.survey._etag, pages_json: data })
        } else {
          this.message = { title: 'Oops!', content: 'You must save the survey properties first' }
          this.$refs.messageDialog.open()
        }
      },
      setSurveyRender (val) {
        this.form.render = val
      },
      setFormTitle (val) {
        this.form.title = val
      },
      setFormVersion (val) {
        this.form.version = val
      },
      setFormDescription (val) {
        this.form.description = val
      },
      closeMessageDialog () {
        this.$refs.messageDialog.close()
        this.message = {}
      },
      openPropertiesDialog () {
        this.$refs.propertiesDialog.open()
      },
      closePropertiesDialog () {
        this.$refs.propertiesDialog.close()
      },
      removeSurvey () {
        let a = confirm('Are you sure you want to permanently delete this survey: ' + this.survey.title + '?')
        if (a) {
          this.$store.dispatch(SurveyTypes.remove, Object.assign({}, this.survey))
          this.$router.back()
        }
      },
      mountEditor () {
        console.log('mounting editor...')
        let self = this
        self.editor = new SurveyEditor('editor-container', self.options)
        window.editor = self.editor
  
        if (self.editor.renderedElement) {
          // remove default toolbox as it renders weird with material-design-bootstrap
          self.editor.renderedElement.firstChild.children[0].remove()

          self.editor.saveSurveyFunc = function () {
            self.saveSurvey(this.text)
          }
        }

        self.editor.text = self.survey.pages_json
      },
      failMessage (title, content) {
        this.message = { title: title || 'Oops!', content: content || 'Something went wrong' }
        this.$refs.messageDialog.open()
      }
    },
    updated () {
      this.mountEditor()
    },
    mounted () {
      this.$store.dispatch(RenderTypes.findAll)
      let id = this.$route.params.id
      if (id) {
        this.$store.dispatch(SurveyTypes.find, id)
      } else {
        this.failMessage('Oops!', 'No Id parameter provided!')
      }
    }
  }
</script>
