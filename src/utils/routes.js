import paths from '../constants/paths'
import Welcome from '../pages/Welcome'
import Home from '../pages/Home'
import HomeContent from '../pages/HomeContent'
import Other from '../pages/Other'

export default [
  { 
    path: '/',
    title: 'home',
    component: Home,
    children: [
      {
        path: '/', //设为''无法跳转回来
        title: 'result',
        component: HomeContent
      },
      {
        path: paths.welcome, //这个值不能是undefined
        title: 'welcome',
        component: Welcome
      },
    ]
  },
  {
    path: paths.other,
    title: 'other',
    component: Other
  }
]

