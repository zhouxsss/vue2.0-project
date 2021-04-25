import paths from '../constants/paths'
import Welcome from '../pages/Welcome'
import Home from '../pages/Home'
import HomeContent from '../pages/HomeContent'
import Other from '../pages/Other'
import VirtualScrollTree from '../pages/VirtualScrollTree'
import AVueDemo from '../pages/AVueDemo'
import DraggableSort from '../pages/DraggableSort'
import BigFileUpload from '../pages/BigFileUpload'

export default [
  {
    path: '/',
    title: 'home',
    component: Home,
    children: [
      {
        path: '/', //设为''无法跳转回来
        title: 'result',
        component: HomeContent,
      },
      {
        path: paths.welcome, //这个值不能是undefined
        title: 'welcome',
        component: Welcome,
      },
      {
        path: paths.virtualScrollTree,
        title: 'VirtualScrollTree',
        component: VirtualScrollTree,
      },
      {
        path: paths.aVue,
        title: 'AVueDemo',
        component: AVueDemo,
      },
      {
        path: paths.draggableSort,
        title: 'DraggableSort',
        component: DraggableSort,
      },
      {
        path: paths.bigFileUpload,
        title: 'BigFileUpload',
        component: BigFileUpload,
      },
    ],
  },
  {
    path: paths.other,
    title: 'other',
    component: Other,
  },
]
