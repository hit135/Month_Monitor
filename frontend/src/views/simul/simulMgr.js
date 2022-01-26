import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSelect, CSwitch } from "@coreui/react";

import PageTableWidget from "../../widget/pageTableWidget";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

import { numCommaFormat } from "../../agent/commonIndex";

const SimulMgr = () => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CCol className={"pl-0"} md={"12"} xl={"12"}>
              <h5 className={"mb-0 ml-0 float-left"}>시뮬레이션</h5>
            </CCol>
          </CCardHeader>
          <CCardBody className={"pt-3"}>
            <CRow className={"mb-3"}>
              <CCol md={"6"}>
                <h5>알림톡 예시</h5>
                <div className={'p-3'} style={{ border: '1px solid black' }}>
                  [<span id="strName">엄마손반찬</span> 전기위험 보고(22년 1월)]<br/>
                  기간 : <span id="period">2022.01.01 ~ 2022.01.31</span><br/><br/>
                  *전기위험 현황<br/>
                  ※ <span id="evtState">안전한 상태입니다 그래도 전기화재에 주의하십시오.</span><br/><br/>
                  위험순위 : <span id="evtRank">120 위 / 130 개 상점</span><br/>
                  과전류발생 : <span id="ocAlm">0 회</span><br/>
                  누전발생 : <span id="igAlm">0 회</span><br/><br/>
                  *전력사용<br/>
                  순위 : <span id="kwhRank">23 위 / 130 개 상점</span><br/>
                  일별평균전력사용량 : <span id="dailyUseKwhAvg">12 kWh</span><br/>
                  전력사용량총합 : <span id="totUseKwh">123 kWh</span><br/><br/>
                  ※ <span id="kwhState">전주대비 전력소비가 많습니다.</span>
                </div>
              </CCol>
              <CCol md={"6"}>
                <h5>기간 년월</h5>
                <input type={"text"} id="yearMonth" style={{ width: '100%' }} />

                <div className={'mt-3'}>
                  <h5>상점 코드 입력</h5>
                  <input type={"text"} id="strCode" style={{ width: '100%' }} />
                </div>

                <div className={'mt-3'}>
                  <h5>메시지 전송 연락처 입력</h5>
                  <input type={"text"} id="toinfo" style={{ width: '100%' }} />
                </div>

                <div className={'mt-3'}>
                  <button className={'btn btn-custom-info'} id={"previewBtn"}>미리보기</button>
                  <button className={'ml-2 btn btn-custom-info'} id={"sendBtn"}>전송</button>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SimulMgr;
