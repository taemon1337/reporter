import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SurveyPage from '@/pages/SurveyPage'
import ReportPage from '@/pages/ReportPage'
import EditorPage from '@/pages/EditorPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/surveys',
      name: 'SurveysPage',
      component: SurveyPage
    },
    {
      path: '/reports',
      name: 'ReportPage',
      component: ReportPage
    },
    {
      path: '/editor',
      name: 'EditorPage',
      component: EditorPage
    }
  ]
})
