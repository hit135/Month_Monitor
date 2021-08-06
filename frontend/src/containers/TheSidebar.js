import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

function movePageMng() {
  if(window.location.hostname === "localhost") {
    window.location.href = "http://localhost:8081/";
  } else {
    window.location.href = "http://1.223.40.19:30081/";
  }
}

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={'/fs/img/logo-fs.png'} style={{ "width" : "3rem"}} />
        <span style={{"font-size" : "1.2rem", fontWeight : "900"}}>관제관리시스템</span>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
        <li className="c-sidebar-nav-item"><a className="c-sidebar-nav-link" tabIndex="0" onClick={movePageMng}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="c-sidebar-nav-icon" role="img">
            <polygon fill="var(--ci-primary-color, currentColor)"
                     points="359.873 121.377 337.246 144.004 433.243 240.001 16 240.001 16 240.002 16 272.001 16 272.002 433.24 272.002 337.246 367.996 359.873 390.623 494.498 256 359.873 121.377"
                     className="ci-primary"></polygon>
          </svg>
          전체관제이동</a></li>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
