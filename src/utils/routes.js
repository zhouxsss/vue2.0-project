import paths from '../constants/paths'
import Welcome from '../pages/Welcome'
import Home from '../pages/Home'
import Other from '../pages/Other'

export default [
  {
    path: paths.home,
    component: Home,
    children: [
      {
        path: paths.Welcome,
        component: Welcome
      }
    ]
  },
  {
    path: paths.other,
    component: Other
  }
]
