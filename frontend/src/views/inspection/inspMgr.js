import React, { lazy, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

const InspMgr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <div className={'d-flex'}>
        <span>
          <input type="radio" name="inspSelect" id="insp1" value="1" readOnly checked />
          <label style={{ marginLeft: "0.25rem" }} htmlFor={'insp1'}>점검필요</label>
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <input type="radio" name="inspSelect" id="insp2" value="2" readOnly />
          <label style={{ marginLeft: "0.25rem" }} htmlFor={'insp2'}>점검완료</label>
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <input type="radio" name="inspSelect" id="insp3" value="3" readOnly />
          <label style={{ marginLeft: "0.25rem" }} htmlFor={'insp3'}>점검요청</label>
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <input type="radio" name="inspSelect" id="insp4" value="4" readOnly />
          <label style={{ marginLeft: "0.25rem" }} htmlFor={'insp4'}>점검불필요</label>
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <input type="radio" name="inspSelect" id="insp5" value="5" readOnly />
          <label style={{ marginLeft: "0.25rem" }} htmlFor={'insp5'}>전체</label>
        </span>
        <span style={{ marginLeft: "5rem" }}>
          <DatePicker locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)}/>
        </span>
        <span style={{ marginLeft: "0.5rem" }}>~</span>
        <span style={{ marginLeft: "0.5rem" }}>
          <DatePicker locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>
        </span>
        <span style={{ float: 'right' }}>
          <select>
            <option>전체(시장)</option>
          </select>
        </span>
      </div>
      <CRow>
        <CCol xs={4} sm={4} lg={4}>

        </CCol>
        <CCol xs={4} sm={4} lg={4}>

        </CCol>
        <CCol xs={4} sm={4} lg={4}>

        </CCol>
      </CRow>
    </div>
  )
}

export default InspMgr;
