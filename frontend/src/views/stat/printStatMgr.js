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
    {/* 표지 */}
    <div className={"printRow"}>
      <div className={"d-flex justify-content-between"}>
        <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
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
    <CCard className={"mb-0"}>
      <CCardBody className={"p-0"}>
        {/* 전기안전 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>
          <div className={"pl-4 pr-4 pt-4"}>
            {props.areaState}
            {props.areaTotalWarning}
          </div>
          <div className="position-absolute-ct">
            <h3 className="m-0" style={{fontSize: "2rem"}}>- 1 -</h3>
          </div>

          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
          </div>
        </div>

        {/* 과전류, IGO */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>
          <div className={"pl-4 pr-4 pt-4"}>
            {props.areaHourlyStat}
          </div>

          <div className="position-absolute-ct">
            <h3 className="m-0" style={{fontSize: "2rem"}}>- 2 -</h3>
          </div>

          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
          </div>
        </div>

        {/* IGR, 내 시장별 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>
          <div className={"pl-4 pr-4 pt-4"}>
            {props.areaHourlyStat2}
            {
              (props.areaTitle !== "대전중앙시장") &&
              <div>
                {props.levelAreaStat}
              </div>
            }
          </div>

          <div className="position-absolute-ct">
            <h3 className="m-0" style={{fontSize: "2rem"}}>- 3 -</h3>
          </div>

          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
          </div>

        </div>

        {
          props.areaTitle === "대전중앙시장" &&
          <div className={"printRow"}>
            <div className={"d-flex justify-content-between"}>
              <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
              <div className={"p-5"}>
                <h3 style={{fontSize: "2rem"}}>
                  {props.type}
                </h3>
              </div>
            </div>

            <CRow>
              <div className={"pl-4 pr-4 pt-4"}>
                {props.levelAreaStat}
              </div>
              <div className="position-absolute-ct">
                <h3 className="m-0" style={{fontSize: "2rem"}}>- 4 -</h3>
              </div>

              <div className="position-absolute-rb">
                <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
              </div>
            </CRow>
          </div>
        }

        {/* 내 상점별 현황 */}
        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>
          <div className={"pl-4 pr-4 pt-4"}>
            {props.levelStrStat}
          </div>

          <CRow>
          <div className="position-absolute-ct">
            {
              props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 5 -</h3>
            }
            {
              props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 4 -</h3>
            }
          </div>

          <div className="position-absolute-rb">
            <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
          </div>
          </CRow>
        </div>

        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>

          <div className={"pl-4 pr-4 pt-4"}>
            {props.areaKwhStat}
            {props.areaKwhYearStat}
            {props.areaKwhHourlyStat}
          </div>

          <CRow>
            <div className="position-absolute-ct">
              {
                props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 6 -</h3>
              }
              {
                props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 5 -</h3>
              }
            </div>

            <div className="position-absolute-rb">
              <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
            </div>
          </CRow>
        </div>

        <div className={"printRow"}>
          <div className={"d-flex justify-content-between"}>
            <img src={'/fs/img/logo.png'} style={{ width: "250px" }} />
            <div className={"p-5"}>
              <h3 style={{fontSize: "2rem"}}>
                {props.type}
              </h3>
            </div>
          </div>

          <div className={"pl-4 pr-4 pt-4"} style={{marginBottom: "50%"}}>
            {props.strKwhStat}
          </div>

          <CRow>
            <div className="position-absolute-ct">
              {
                props.areaTitle === "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 7 -</h3>
              }
              {
                props.areaTitle !== "대전중앙시장" && <h3 className="m-0" style={{fontSize: "2rem"}}>- 6 -</h3>
              }
            </div>

            <div className="position-absolute-rb">
              <img src={"/fs/img/logo-fs.png"} style={{width: "100%", maxWidth: "80px" }} />
            </div>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
  </div>
));
