import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SurveyPage from '@/pages/SurveyPage'
import TemplatePage from '@/pages/TemplatePage'
import ReportsPage from '@/pages/ReportsPage'
import EditorPage from '@/pages/EditorPage'
import ReportPage from '@/pages/ReportPage'

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
      name: 'surveys',
      component: SurveyPage
    },
    {
      path: '/surveys/:id',
      name: 'survey',
      component: EditorPage
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatePage
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsPage
    },
    {
      path: '/reports/:id',
      name: 'report',
      component: ReportPage
    }
  ]
})
