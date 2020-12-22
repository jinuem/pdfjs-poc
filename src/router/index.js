import Vue from 'vue'
import Router from 'vue-router'
import PdfViewerCmp from '@/components/PdfViewerCmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: PdfViewerCmp
    }
  ]
})
