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
      path: '/templates',
      name: 'templates',
      component: SurveyPage
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportPage
    },
    {
      path: '/templates/:id',
      name: 'template',
      component: EditorPage
    },
    {
      path: '/reports/:id',
      name: 'report',
      component: EditorPage
    }
  ]
})
