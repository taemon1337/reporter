<template>
  <div style='padding:25px;'>
    <h1>Survey Designer</h1>
    <md-layout md-gutter>
      <md-layout md-flex="20" style='padding:5px;'>
        <div v-drag-and-drop:options="dragOptions" style='width:100%;'>
          <md-card v-for='(component, index) in components' key='index' class='draggable'>
            <md-card-header>
              <md-card-header-text>
                {{ component.title }}
              </md-card-header-text>
            </md-card-header>
          </md-card>
        </div>
      </md-layout>
      <md-layout>
        <md-tabs>
          <md-tab id='design' md-label='Design'>
            <div bag='survey-bag'>
              <div v-for='(item, index) in survey' key='index'>
                {{ item }}
              </div>
            </div>
            <div v-drag-and-drop:options="dragOptions" style='width:100%;'>
              <ul style='border:1px solid blue;width:100%;padding:10px;' class='droppable'>
                <li v-for='(item, index) in bag2' key='index'>{{ item }}</li>
              </ul>
            </div>
          </md-tab>
          <md-tab id='json' md-label='Edit JSON'>
            <vue-json-editor v-model='survey'></vue-json-editor>
          </md-tab>
          <md-tab id='preview' md-label='Preview'>
          </md-tab>
        </md-tabs>
      </md-layout>
      <md-layout md-flex="20">
        <survey-designer-properties :component="selected"></survey-designer-properties>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import SurveyDesignerProperties from '@/components/SurveyDesigner/Properties'
  // import Layouts from './Layouts'
  import Inputs from './Inputs'
  import store from './Store'
  import { SurveyDesignerTypes } from './Store/mutation-types'
  import { mapGetters } from 'vuex'
  import VueDraggable from 'vue-draggable'
  import vueJsonEditor from 'vue-json-editor'

  Vue.use(VueDraggable)

  export default {
    name: 'SurveyDesigner',
    store: store,
    props: {
      survey: {
        default () {
          return [
            {
              title: 'Survey Title'
            }
          ]
        }
      }
    },
    data () {
      return {
        selected: null,
        bag1: ['one', 'two', 'three'],
        bag2: ['five', 'six'],
        dragOptions: {
          dropzoneSelector: '.droppable',
          draggableSelector: '.draggable',
          excludeOlderBrowsers: true,
          multipleDropzonesItemsDraggingEnabled: true,
          onDrop: function (event) {
            console.log('here', event)
          },
          onDragstart: function (event) {}
        }
      }
    },
    computed: {
      ...mapGetters({
        components: SurveyDesignerTypes.findAll
      }),
      surveyJson () {
        return JSON.stringify(this.survey, null, 2)
      }
    },
    components: {
      SurveyDesignerProperties,
      vueJsonEditor
    },
    mounted () {
      for (var key in Inputs) {
        this.$store.dispatch(SurveyDesignerTypes.register, { title: key, group: 'input', component: Inputs[key] })
      }
    }
  }
</script>

<style scoped>
  ul
  {
    float:left;
    list-style-type:none;
  
    overflow-y:auto;
  
    /*margin:0 0.5em 0.5em 0;*/
    /*padding:0.5em;*/
  
    border:2px solid #888;
    border-radius:0.2em;
  
    background:#ddd;
    color:#555;
  }
  
  /* drop target state */
  ul[aria-dropeffect="move"]
  {
    border-color:#68b;
  
    background:#fff;
  }
  
  /* drop target focus and dragover state */
  ul[aria-dropeffect="move"]:focus,
  ul[aria-dropeffect="move"].dragover
  {
    outline:none;
  
    box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
  }
  
  /* draggable items */
  li
  {
    display:block;
    list-style-type:none;
  
    margin:0 0 2px 0;
    padding:0.2em 0.4em;
  
    border-radius:0.2em;
  
    line-height:1.3;
  }
  
  /* items focus state */
  li:focus
  {
    outline:none;
  
    box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
  }
  
  /* items grabbed state */
  li[aria-grabbed="true"]
  {
    background:#8adccc;
    color:#fff;
  }
</style>
