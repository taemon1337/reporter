<template>
  <div id="surveyEditorContainer"></div>
</template>

<script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
  import 'bootstrap-material-design/dist/css/ripples.min.css'
  import 'surveyjs-editor/surveyeditor.css'
  import * as SurveyEditor from 'surveyjs-editor'
  
  export default {
    name: 'survey-editor',
    data () {
      return {
      }
    },
    mounted () {
      let editorOptions = { showEmbededSurveyTab: true }
      this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions)
      this.editor.saveSurveyFunc = function () {
        console.log(JSON.stringify(this.text))
      }
    }
  }
</script>

<style scoped>
</style>
