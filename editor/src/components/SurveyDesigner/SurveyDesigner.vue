<template>
  <div style='padding:25px;'>
    <h1>Survey Designer</h1>
    <md-layout md-gutter>
      <md-layout md-flex="20">
        <md-list>
          <md-list-item v-for="(component, index) in components" :key='index'>
            <h3>
              { component.title }
              <span class='md-subhead'>{ component.subtitle }</span>
            </h3>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-layout>
        <md-tabs>
          <md-tab id='design' md-label='Design'></md-tab>
          <md-tab id='json' md-label='Edit JSON'></md-tab>
          <md-tab id='preview' md-label='Preview'></md-tab>
        </md-tabs>
      </md-layout>
      <md-layout md-flex="20">
        <survey-designer-properties :component="selected"></survey-designer-properties>
      </md-layout>
    </md-layout>

  </div>
</template>

<script>
  import SurveyDesignerProperties from '@/components/SurveyDesigner/Properties'
  
  export default {
    name: 'SurveyDesigner',
    data () {
      return {
        selected: null
      }
    },
    components: {
      SurveyDesignerProperties
    }
  }
</script>
