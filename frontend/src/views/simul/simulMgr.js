import React, {useState, useEffect} from 'react';
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import {sendSimulPush} from "../../agent/simul";

import 'react-datepicker/dist/react-datepicker.min.css';

const SimulMgr = () => {
  useEffect(async () => {}, []);

  const clickSend = () => {
    if (window.confirm("발송하겠습니까?")) {
      sendSimulPush().then(r => {
        alert(r.data.result ? "발송되었습니다." : "발송 도중 오류가 발생했습니다.");
      });
    }
  };

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
                  <p className={'mt-0 mb-0'}>[엄마손반찬 전기위험 보고(22년 3월)]</p>
                  <p className={'mt-0 mb-4'}>기간 : 2022.03.01 ~ 2022.03.14</p>

                  <p className={'mt-0 mb-0'}>*전기위험 현황</p>
                  <p className={'mt-0 mb-0'}>※ 안전한 상태입니다. 그래도 전기화재에 주의하십시오.</p>
                  <p className={'mt-0 mb-0'}>등급 : 5등급</p>
                  <p className={'mt-0 mb-0'}>(1등급:고위험&gt;2등급:중위험&gt; 3등급:위험&gt; 4등급:보통&gt; 5등급:안전)</p>
                  <p className={'mt-0 mb-0'}>위험순위 : 태평시장 120위 / 130개 상점</p>
                  <p className={'mt-0 mb-0'}>과전류발생 : 0회</p>
                  <p className={'mt-0 mb-4'}>누전발생 : 0회</p>

                  <p className={'mt-0 mb-0'}>*전력사용</p>
                  <p className={'mt-0 mb-0'}>순위 : 태평시장 23위 / 130개 상점</p>
                  <p className={'mt-0 mb-0'}>일별평균전력사용량 : 12 kWh</p>
                  <p className={'mt-0 mb-4'}>전력사용량총합: 123 kWh</p>

                  <p className={'mt-0 mb-0'}>※ 전주대비 전력소비가 많습니다.</p>
                </div>
              </CCol>
              <CCol md={"6"}>
                <div>※도마큰시장 3월 전기위험 보고입니다.</div>
                <div>
                  <button className={'btn btn-custom-info'} onClick={clickSend}>보내기</button>
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
