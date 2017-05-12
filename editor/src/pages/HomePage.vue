<template>
  <div class='container-fluid' style='padding:25px;'>
    <div class='row'>
      <md-card class='col-xs-4 col-xs-offset-1' v-for="(card, index) in cards" key="index" style='padding:15px;'>
        <md-card-header>
          <div class='md-title'>{{ card.title }}</div>
          <div class='md-subhead'>{{ card.subtitle }}</div>
        </md-card-header>
        
        <md-card-media v-if="card.image">
          <img :src="card.image" style='height:250px;'>
        </md-card-media>
        
        <md-card-actions>
          <md-button class='md-raised md-primary' v-for="(action, idx) in card.actions" key="idx" @click.native="$router.push(action.route)">
            {{ action.text }}
          </md-button>
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
          title: 'Create a new template',
          subtitle: 'Define a template to use to generate reports',
          image: require('../assets/new-template-photo.png'),
          actions: [
            {
              text: 'Open Editor',
              route: '/templates/new'
            }
          ]
        },
        {
          title: 'Fill out a template',
          subtitle: 'Complete a template to create a new report',
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
