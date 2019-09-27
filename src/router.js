import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/movie')
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: () => import('@/views/cinema')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/mine')
    },
    {
      path: '/*',
      redirect: '/movie'
    }
  ]
})
