import React, {useEffect, useRef, useState} from 'react'
import {CRow, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CSelect} from "@coreui/react";
import 'react-datepicker/dist/react-datepicker.min.css';

export const ComponentToPrint3 = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {/* 표지 */}
    {props.typeName !== "store" &&
      <div className={"printRow"}>
        <div className={"d-flex justify-content-between logoMargin"}>
          <img class="image" src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
          <div className={"p-5"}>
            <h3 style={{ fontSize: "40px" }}>{props.type}</h3>
          </div>
        </div>
        <div className={"d-flex justify-content-center"} style={{ marginTop: "10rem" }}>
          <h1 style={{fontSize: "50px"}}>대전 스마트시티 챌린지 사업(2020~2022)</h1>
        </div>
        <div className={"d-flex justify-content-center"} style={{ marginTop: "5rem" }}>
          <h1 style={{fontSize: "50px"}}>&lt;전기화재 예방 서비스&gt;</h1>
        </div>
        <div className={"d-flex justify-content-center"} style={{ marginTop: "10rem" }}>
          <h1 className={"text-center"} style={{ fontSize: "65px", textDecoration: "underline", textUnderlinePosition: "under" }}>
            {props.areaTitle}<br/><br/>
            관제서비스 운영보고서
          </h1>
        </div>
        <div className={"d-flex justify-content-center"} style={{ marginTop: "5rem" }}>
          <h1 className={"text-center"} style={{ fontSize: "45px" }}>[<span>{props.startDate + " ~ " + props.endDate}</span>]</h1>
        </div>
        <div className={"d-flex justify-content-center"} style={{ marginTop: "500px" }}>
          <h2 style={{ fontSize: "50px", fontWeight: "900" }}>㈜에프에스</h2>
        </div>
      </div>}

    <CCard className={"mb-0"}>
      <CCardBody className={"p-0"}>
        {/* 전기안전 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>{props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{ width: "1680px" }}>
              {props.areaState}
              {props.areaTotalWarning}
            </div>
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{ fontSize: "30px" }}>- 1 -</h3>
          </div>
          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
          </div>
        </div>

        {/* 과전류, IGO */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>{props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{ width: "1680px" }}>{props.areaHourlyStat}</div>
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{ fontSize: "30px" }}>- 2 -</h3>
          </div>
          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
          </div>
        </div>

        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>{props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{ width: "1680px" }}>{props.areaHourlyStat2}</div>
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{ fontSize: "30px" }}>- 3 -</h3>
          </div>
          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
          </div>
        </div>

        {/* 내 상점별 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>
                {props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{ width: "1680px" }}>
              {props.levelAreaStat}
              {props.levelStrStat}
            </div>
          </div>
          <CRow>
            <div className="position-absolute-ct">
              {props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 5 -</h3>}
              {props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 4 -</h3>}
            </div>
            <div className="position-absolute-rb">
              <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "150px" }} />
            </div>
          </CRow>
        </div>

        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>{props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{ width: "1680px" }}>
              {props.areaKwhStat}
              {props.areaKwhYearStat}
              {props.areaKwhHourlyStat}
              {props.strKwhStat}
            </div>
          </div>
          <CRow>
            <div className="position-absolute-ct">
              {props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 6 -</h3>}
              {props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 5 -</h3>}
            </div>
            <div className="position-absolute-rb">
              <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
            </div>
          </CRow>
        </div>

        <div className={"printRow"}>
          <div className={"d-flex justify-content-between logoMargin"}>
            <img src={"/fs/img/logo-v2.png"} style={{ width: "350px", height: "80px" }} />
            <div className={"p-5"}>
              <h3 style={{ fontSize: "30px" }}>{props.areaTitle} 운영보고서</h3>
            </div>
          </div>
          <div className={"pl-2 pr-2 pt-0"}>
            <div style={{width: "1680px"}}>
              {props.areaUseKwhStat}
              {props.strKwhList}
            </div>
          </div>
          <CRow>
            <div className="position-absolute-ct">
              {props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 7 -</h3>}
              {props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{ fontSize: "30px" }}>- 6 -</h3>}
            </div>
            <div className="position-absolute-rb">
              <img src={"/fs/img/logo-fs.png"} style={{ width: "100%", maxWidth: "150px" }} />
            </div>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
  </div>
));
