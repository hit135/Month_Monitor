import React, {useEffect, useRef, useState} from 'react'
import {CRow, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CSelect} from "@coreui/react";
import 'react-datepicker/dist/react-datepicker.min.css';

export const ComponentToPrint2 = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <CCard className={"mb-0"}>
      <CCardBody className={"p-0"}>
        {/* 전기안전 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <div>
              <img src={'/fs/img/logo-v2.png'} style={{ width: "250px", height: "60px" }} />
            </div>
            <div className="p-2 bd-highlight text-center">
              <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>대전 스마트시티 챌린지 사업</h2>
              <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
                {props.areaTitle} [<span style={{ color: "red" }}>{typeof props.endDate === 'undefined' ? props.startDate : props.startDate + " ~ " + props.endDate}</span>] {props.strName} 현황 보고서
              </h2>
            </div>
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>
                {/*{props.type}*/}
                <h2>[전기화재 예방 서비스]</h2>
              </h3>
            </div>
          </div>
          <div className={"pl-4 pr-4 pt-4"}>
            <div style={{width: "1650px"}}>
              {props.areaState}
              {props.storeYearWarning}
              {props.storeChart}
            </div>
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{ fontSize: "30px" }}>- 1 -</h3>
          </div>
          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
));
