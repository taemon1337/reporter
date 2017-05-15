<template>
  <div class='container-fluid' style='padding:25px;'>
    <div class='row'>
      <md-card class='col-xs-3 col-xs-offset-1' v-for="(card, index) in cards" key="index" style='padding:15px;'>
        <md-card-header>
          <div class='md-title'>{{ card.title }}</div>
          <div class='md-subhead'>{{ card.subtitle }}</div>
        </md-card-header>
        
        <md-card-media v-if="card.image" @click.native="$router.push(card.actions[0].route)" style='cursor:pointer;'>
          <img :src="card.image" style='height:250px;'>
        </md-card-media>
        
        <md-card-actions>
          <div v-for="(action, idx) in card.actions" key="idx">
            <md-button class='md-raised md-primary'  @click.native="$router.push(action.route)">
            {{ action.text }}
          </md-button>
          </div>
        </md-card-actions>
      </md-card>
    </div>
    <hr>
    <div class='row'>
      <div class='col-xs-6'>
        <survey-table :hidden="hiddenFields" max_results='5'></survey-table>
      </div>
      <div class='col-xs-6'>
        <report-table :hidden="hiddenFields" max_results='5' sort='_updated'></report-table>
      </div>
    </div>
  </div>
</template>

<script>
import SurveyTable from '@/components/SurveyTable'
import ReportTable from '@/components/ReportTable'

export default {
  name: 'HomePage',
  data () {
    return {
      hiddenFields: ['description'],
      cards: [
        {
          title: 'Create a new survey',
          subtitle: 'Create a survey form to collect report fields',
          image: require('../assets/new-survey-photo.png'),
          actions: [
            {
              text: 'Open Editor',
              route: '/surveys/new'
            }
          ]
        },
        {
          title: 'Create a Template',
          subtitle: 'Design a template to generate PDF reports',
          image: require('../assets/new-template-photo.png'),
          actions: [
            {
              text: 'Create Template',
              route: '/templates'
            }
          ]
        },
        {
          title: 'Create a report',
          subtitle: 'Fill out and save a survey to create report data',
          image: require('../assets/new-report-photo.jpg'),
          actions: [
            {
              text: 'Create Report',
              route: '/reports/new'
            }
          ]
        }
      ]
    }
  },
  components: {
    SurveyTable,
    ReportTable
  }
}
</script>
