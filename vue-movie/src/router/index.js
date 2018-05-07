import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/index/Index.vue'
import Theater from '../components/theater/Theater.vue'
import Comingsoon from '../components/comingsoon/Comingsoon.vue'
import Top250 from '../components/top250/Top250.vue'
import Search from '../components/search/Search.vue'
import Moviedes from '../components/moviedes/Moivedes.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
    	path:'/theater',
    	name:'Theater',
    	component:Theater
    },
    {
      path:'/comingsoon',
      name:'Comingsoon',
      component:Comingsoon
    },
    {
      path:'/top250',
      name:'Top250',
      component:Top250
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/moviedes',
      name:'Moviedes',
      component:Moviedes
    }

  ]
})
