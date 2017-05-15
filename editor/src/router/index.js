import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SurveyPage from '@/pages/SurveyPage'
import TemplatePage from '@/pages/TemplatePage'
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
      name: 'surveys',
      component: SurveyPage
    },
    {
      path: '/surveys/:id',
      name: 'survey',
      props: true,
      component: EditorPage
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatePage
      // redirect: function () {
      //   window.location = '/templates'
      // }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportPage
    },
    {
      path: '/reports/:id',
      name: 'report',
      component: EditorPage
    }
  ]
})
