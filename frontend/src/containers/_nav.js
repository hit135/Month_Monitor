import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: '구역관리',
    to: '/area',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '회원관리',
    to: '/mem',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '상점관리',
    to: '/str',
    icon: <CIcon name="cil-basket" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '센서관리',
    to: '/snsr',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '점검이력',
    to: '/insp',
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '발송이력',
    to: '/push',
    icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: '통계',
    to: '/stat',
    icon: <CIcon name="cil-chart-pie" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
]

export default _nav
