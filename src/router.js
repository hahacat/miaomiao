import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/movie'),
      children: [
        {
          path: '/',
          redirect: '/movie/nowplaying'
        },
        {
          path: 'city',
          name: 'city',
          component: () => import('@/components/City')
        },
        {
          path: 'nowplaying',
          name: 'nowplaying',
          component: () => import('@/components/Nowplaying')
        },
        {
          path: 'nowcoming',
          name: 'nowcoming',
          component: () => import('@/components/Nowcoming')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/components/Search')
        },
        {
          path: 'detail/nowcoming/:id',
          components: {
            default: () => import('@/components/Nowcoming'),
            detail: () => import('@/views/movie/detail')
          },
          props: { default: false, detail: true }
        },
        {
          path: 'detail/nowplaying/:id',
          components: {
            default: () => import('@/components/Nowplaying'),
            detail: () => import('@/views/movie/detail')
          },
          props: { default: false, detail: true }
        }
      ]
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
      redirect: '/movie/nowplaying'
    }
  ]
})
