import React, { lazy } from 'react'
import { CRow, CCol, CButtonGroup, CButton, CInput, CSelect } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

const PushMgr = () => {
  return (
    <div>
      <div>
        <CButtonGroup>
          <CButton color={'info'}>전체</CButton>
          <CButton color={'info'}>발송</CButton>
          <CButton color={'info'}>미발송</CButton>
        </CButtonGroup>
      </div>
      <div>


      </div>
    </div>
  )
}

export default PushMgr;
