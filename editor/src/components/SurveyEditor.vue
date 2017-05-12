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
        Edit Template Properties
      </md-dialog-title>
      <md-dialog-content>
        <form @submit.stop.prevent='saveProperties' novalidate>
          <md-input-container>
            <label>Id</label>
            <md-input :value='template._id' disabled></md-input>
          </md-input-container>
          
          <md-input-container>
            <label>Title</label>
            <md-input v-model='form.title' :placeholder='template.title'></md-input>
          </md-input-container>

          <md-input-container>
            <label>Version</label>
            <md-input v-model='form.version' :placeholder='template.version'></md-input>
          </md-input-container>          

          <md-input-container>
            <label>Description</label>
            <md-textarea v-model='form.description' :placeholder='template.description'></md-textarea>
          </md-input-container>
          
          <md-button type='submit' ref='savePropertiesButton' hidden>Save Properties</md-button>
        </form>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class='md-raised' @click.native='closePropertiesDialog'>Cancel</md-button>
        <md-button class='md-raised md-primary' @click.native='$refs.savePropertiesButton.$el.click()'>Save Template</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-toolbar md-theme='sub'>
      <h2 class="md-title">
        <md-input-container @click.native='openPropertiesDialog' style='width:150px;'>
          <label>Template Title</label>
          <md-tooltip>Edit Template Properties</md-tooltip>
          <md-input :value="template.title"></md-input>
        </md-input-container>
      </h2>
      
      <md-button class='md-raised md-success' @click.native='editor.saveButtonClick()' :disabled='!template._id'>Save Template</md-button>
      
      <h3 style='margin-left:150px;flex: 1'>Template Designer</h3>
      
      <md-button class='md-raised md-accent' @click.native='editor.showDesigner()'>Design</md-button>
      <md-button class='md-raised md-accent' @click.native='editor.showJsonEditor()'>Edit JSON</md-button>
      <md-button class='md-raised md-accent' @click.native='editor.showTestSurvey()'>Preview</md-button>
      
      <md-button class='md-raised md-icon-button' @click.native="editor.doUndoClick">
        <md-tooltip>Undo</md-tooltip>
        <md-icon>undo</md-icon>
      </md-button>
      <md-button class='md-raised md-icon-button' @click.native="editor.doRedoClick">
        <md-tooltip>Redo</md-tooltip>
        <md-icon>redo</md-icon>
      </md-button>
    </md-toolbar>
    <div :id="container"></div>
  </div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'
  // import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
  // import 'bootstrap-material-design/dist/css/ripples.min.css'
  import 'surveyjs-editor/surveyeditor.css'
  import * as SurveyEditor from 'surveyjs-editor'
  import { SurveyTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'survey-editor',
    data () {
      return {
        form: {},
        message: {},
        container: 'editor-container',
        options: {
          showTestSurveyTab: false
        }
      }
    },
    computed: {
      ...mapGetters({
        template: SurveyTypes.current
      })
    },
    methods: {
      saveProperties (e) {
        this.$store.dispatch(SurveyTypes.save, Object.assign({}, this.template, this.form))
        this.form = {}
        this.closePropertiesDialog()
      },
      saveTemplate (data) {
        if (this.template._id) {
          this.$store.dispatch(SurveyTypes.save, { _id: this.template._id, _etag: this.template._etag, pages_json: data })
        } else {
          this.message = { title: 'Oops!', content: 'You must save the template properties first' }
          this.$refs.messageDialog.open()
        }
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
      mountEditor () {
        let self = this
        self.editor = new SurveyEditor.SurveyEditor(self.container, self.options)
  
        window.editor = self.editor
  
        // remove default toolbox as it renders weird with material-design-bootstrap
        self.editor.renderedElement.firstChild.children[0].remove()
  
        self.editor.saveSurveyFunc = function () {
          self.saveTemplate(this.text)
        }

        self.editor.text = self.template.pages_json
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
      let id = this.$route.params.id
      if (id && id !== 'new') {
        this.$store.dispatch(SurveyTypes.find, { _id: id })
      } else {
        this.failMessage('Oops!', 'No Id parameter provided!')
      }
    }
  }
</script>

<style scoped>
</style>
