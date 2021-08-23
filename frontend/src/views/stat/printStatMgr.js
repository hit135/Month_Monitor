import React, {useEffect, useRef, useState} from 'react'
import {
  CRow,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CSelect,
} from "@coreui/react";
import 'react-datepicker/dist/react-datepicker.min.css';
export const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className={"printRow"}>
      <div className={"d-flex justify-content-between"}>
        <img src={'/fs/img/img.png'} style={{ width: "250px" }} />
        <div className={"p-5"}>
          <h3 style={{fontSize: "2rem"}}>
            {props.type}
          </h3>
        </div>
      </div>
      <div className={"d-flex justify-content-center"} style={{marginTop: "10rem"}}>
        <h1 style={{fontSize: "5rem", textDecoration: "underline", textUnderlinePosition: "under"}}>전기화재 예방 시스템 분석 현황</h1>
      </div>

      <div className={"d-flex justify-content-center"} style={{marginTop: "10rem"}}>
        <h3 style={{fontSize: "3rem"}}>{props.startDate} ~ {props.endDate}</h3>
      </div>

      <div className={"d-flex justify-content-center"} style={{marginTop: "40rem"}}>
        <h2 style={{fontSize: "4rem", fontWeight: "900"}}>{props.areaTitle}</h2>
      </div>
      <div className={"d-flex justify-content-end"} style={{height: "800px"}}>
        <h3 className={"d-flex align-items-end align-content-end mr-5"} style={{fontSize: "2.5rem"}}>{new Date().toLocaleDateString()}</h3>
      </div>
    </div>
    <CCard>
      <CCardBody>
        {props.areaState}
        {props.areaTotalWarning}
        {props.areaHourlyStat}
        {props.levelAreaStat}
        {props.levelStrStat}

        {props.areaKwhStat}
        {props.areaKwhYearStat}
        {props.areaKwhHourlyStat}
        {props.strKwhStat}
      </CCardBody>
    </CCard>
  </div>
));
