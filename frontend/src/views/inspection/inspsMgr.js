import React, { lazy, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CInput, CSelect } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";


const InspsMgr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <CCard>
        <CCardHeader>

        </CCardHeader>
        <CCardBody className={'p-0'}>


        </CCardBody>
      </CCard>
    </div>
  );
}

export default InspsMgr;
