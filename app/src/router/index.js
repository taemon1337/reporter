import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import SchemasPage from '@/pages/SchemasPage'
import EditSchemePage from '@/pages/EditSchemePage'
import LayoutsPage from '@/pages/LayoutsPage'
import EditLayoutPage from '@/pages/EditLayoutPage'
import ReportsPage from '@/pages/ReportsPage'
import EditReportPage from '@/pages/EditReportPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/schemes',
      name: 'schemes',
      component: SchemasPage
    },
    {
      path: '/schemes/:id',
      name: 'editScheme',
      component: EditSchemePage,
      props: true
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: LayoutsPage
    },
    {
      path: '/layouts/:id',
      name: 'editLayout',
      component: EditLayoutPage,
      props: true
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsPage
    },
    {
      path: '/reports/:id',
      name: 'editReport',
      component: EditReportPage,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
