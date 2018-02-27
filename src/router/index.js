import Vue from 'vue'
import Router from 'vue-router'
import PizzaApp from '@/components/Index'
import PizzaDetail from '@/components/PizzaDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PizzaList',
      component: PizzaApp
    },
    {
      path: '/pizza/:name',
      name: 'PizzaDetail',
      component: PizzaDetail
    }
  ]
})
