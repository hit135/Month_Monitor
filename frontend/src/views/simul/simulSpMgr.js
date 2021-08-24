import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { sendSimulSpPush } from "../../agent/simul";

const SimulSpMgr = () => {
  const [phoneNum, setPhoneNum] = useState('');

  const clickSendSimulSpPush = () => {
    let map = {};
    map['toinfo'] = phoneNum;

    sendSimulSpPush(map).then(resp => {
      if (resp.data['result'])
        alert("발송되었습니다.");
      else
        alert("발송 도중 오류가 발생했습니다.");
    });
  }

  return (
    <CCard>
      <CCardHeader>
        <h5 className={"mb-0 ml-0"}>시뮬레이션샘플</h5>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={'6'}>
            <div className={'p-3'} style={{ border: '1px solid black' }}>
              [전기화재예방] 전기 위험발생안내<br/><br/>
              ■ 시장명: 도마큰시장<br/><br/>
              ■ 상점명: k2<br/><br/>
              ■ 발생일시: 2021년 08월 23일 15시 30분<br/><br/>
              ■ 발생정보:<br/>
              누전(IGO) 수치가 40mA 이상 발생(전기안전법상 1mA이하가 정상입니다)<br/><br/>
              ■ 조치방법:<br/>
              상점내 전기설비에 대해 전기전문가에게 점검받을 것을 권장합니다.
            </div>
          </CCol>
          <CCol md={'6'}>
            <h5>메시지 전송 연락처 입력</h5>
            <input type={"text"} style={{ width: '100%' }} onChange={e => setPhoneNum(e.target.value)} />
            <button className={'mt-1 btn btn-custom-info'} id={"sendBtn"} onClick={clickSendSimulSpPush}>전송</button>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );


};

export default SimulSpMgr;
