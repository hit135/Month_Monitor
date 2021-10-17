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
export const ComponentToPrint2 = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <CCard className={"mb-0"}>
      <CCardBody className={"p-0"}>
        {/* 전기안전 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <div>
              <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            </div>

            <div className="p-2 bd-highlight text-center">
              <h2>대전 스마트시티 챌린지 사업</h2>
              <h2>&lt;전기화재 예방 서비스&gt;</h2>
              <h2>{props.areaTitle} [<span style={{color: "red"}}>{props.endDate === undefined ? props.startDate : props.startDate + " ~ " + props.endDate}</span>] {props.strName} 현황 보고서</h2>
            </div>
            <div className={"p-5"}>
              <h3 style={{fontSize: "30px"}}>
                {props.type}
              </h3>
            </div>
          </div>

          <div className={"pl-4 pr-4 pt-4"}>
            {props.areaState}
            {props.storeYearWarning}
            {props.storeChart}
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{fontSize: "30px"}}>- 1 -</h3>
          </div>

          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
));
