import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import React, {useEffect, useState} from "react";


const AreaActionModal = (props) => {

  const { info, setInfo } = props
  return (
    <>
      <CModal
        show={info}
        onClose={() => setInfo(!info)}
        color="info"
      >
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInfo(!info)}>Cancel</CButton>
          <CButton color="info" onClick={() => setInfo(!info)}>Do Something</CButton>{' '}
        </CModalFooter>
      </CModal>
    </>
  )

}

export default AreaActionModal
