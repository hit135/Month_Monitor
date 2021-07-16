import React, { lazy, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CInput, CSelect } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

const inspSelectSpan = (className, id, value, checked, text) =>
  <span className={className}>
    <input type="radio" name="inspSelect" id={id} value={value} readOnly checked={checked}/>
    <label className={'ml-1'} htmlFor={id}>{text}</label>
  </span>

const InspMgr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <CCard>
        <CCardHeader>
          <div className={'d-flex justify-content-between'}>
            <h5 className={"mb-0 ml-0"}>점검 이력 목록</h5>
            <span>
              {inspSelectSpan('', 'insp1', '1', 'Y', '점검필요')}
              {inspSelectSpan('ml-2', 'insp2', '2', 'N', '점검완료')}
              {inspSelectSpan('ml-2', 'insp3', '3', 'N', '점검요청')}
              {inspSelectSpan('ml-2', 'insp4', '4', 'N', '점검불필요')}
              {inspSelectSpan('ml-2', 'insp5', '5', 'N', '전체')}
            </span>
            <span className={'d-flex'}>
              <DatePicker locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)}/>
              <span className={'ml-1'}>~</span>
              <DatePicker className={'ml-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>
            </span>
            <span>
              <CSelect>
                <option>전체(시장)</option>
              </CSelect>
            </span>
          </div>
        </CCardHeader>
        <CCardBody className={'p-0'}>
          <CRow className={'pl-0 pr-0'}>
            <CCol xs={12} sm={8} lg={8} style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000' }}>
              <div>● [점검대상] [2021-06-21 11:15:11] 000000000222 - 수연주단(4)</div>
              <div>● [점검대상] [2021-06-21 11:15:07] 000000000221 - 황제맞춤(4)</div>
              <div>● [점검대상] [2021-06-21 11:14:59] 000000000225 - 일성사(4)</div>
              <div>● [점검대상] [2021-06-21 11:14:54] 000000000227 - 수각사(4)</div>
              <div>● [점검대상] [2021-06-21 11:14:34] 000000000229 - 수선사(4)</div>
            </CCol>
            <CCol xs={12} sm={4} lg={4} style={{ backgroundColor: '#FFFFFF', border: '1px solid #000000' }}>
              <div className={'d-flex justify-content-between mt-2'}>
                <span style={{ fontSize: '2.5vh' }}>수연주단</span>
                <CButton color={'success'}>알림보내기</CButton>
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'snsrId'}>센서 아이디</label>
                <CInput id={'snsrId'} type={'text'} />
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'strTel'}>연락처</label>
                <CInput id={'strTel'} type={'text'} />
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'strAddr'}>주소</label>
                <CInput id={'strAddr'} type={'text'} />
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'lchkDate'}>점검일</label>
                <CInput id={'lchkDate'} type={'text'} />
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'inspectId'}>점검자</label>
                <CInput id={'inspectId'} type={'text'} />
              </div>
              <div className={'mt-3'}>
                <label htmlFor={'inspectComment'}>기타</label>
                <CInput id={'inspectComment'} type={'text'} />
              </div>
              <div className={'mt-5'}>
                <label>점검상태(점검필요, 점검완료, 점검요청, 점검불필요)</label>
                <CSelect>
                  <option>점검필요</option>
                  <option>점검완료</option>
                  <option>점검요청</option>
                  <option>점검불필요</option>
                </CSelect>
              </div>
              <div className={'mt-3 mb-3 d-flex justify-content-between'}>
                <CButton color={'danger'}>삭제</CButton>
                <CButton color={'primary'}>저장</CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default InspMgr;
