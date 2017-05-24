<template>
  <div>
    <div style='float:right'>
      <md-button @click.native='editor=!editor'>
        <md-icon>launch</md-icon>
      </md-button>
    </div>
    <div v-if="editor">
      <survey-editor></survey-editor>
    </div>
    <div v-else>
      <survey-designer></survey-designer>
    </div>
  </div>
</template>

<script>
  import SurveyEditor from '@/components/SurveyEditor'
  import SurveyDesigner from '@/components/SurveyDesigner/SurveyDesigner'
  
  export default {
    name: 'EditorPage',
    data () {
      return {
        editor: true
      }
    },
    components: {
      SurveyEditor,
      SurveyDesigner
    }
  }
</script>
