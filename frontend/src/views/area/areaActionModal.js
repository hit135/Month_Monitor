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
          {/*(paginationSize) ? paginationSize : 5,*/}
          <CModalTitle>구역 등록</CModalTitle>
        </CModalHeader>
        <CModalBody>

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
