<template>
  <div>
    <survey-designer></survey-designer>
  </div>
</template>

<script>
import SurveyDesigner from '@/components/SurveyDesigner/SurveyDesigner'
import * as SurveyVue from 'survey-vue'
var Survey = SurveyVue.Survey
Survey.cssType = 'bootstrap'

export default {
  name: 'EditorPage',
  data () {
    var json = {
      title: 'DFS Form Templates',
      showProgressBar: 'top',
      pages: [
        {
          questions: []
        }
      ]
    }
    var model = new SurveyVue.Model(json)
    return {
      survey: model
    }
  },
  components: {
    Survey,
    SurveyDesigner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
