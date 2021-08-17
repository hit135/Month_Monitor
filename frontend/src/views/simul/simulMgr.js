import React, { lazy, useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSelect, CSwitch } from "@coreui/react";

import PageTableWidget from "../../widget/pageTableWidget";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";

import { getSimulAreaList, getSimulList } from "../../agent/simul";
import { numCommaFormat, getInputValue } from "../../agent/commonIndex";

const columns1 = [
    { dataField: 'lSeq', text: 'Log no.', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right', height: '42px', width: '5rem' }
      , formatter: numCommaFormat }
  , { dataField: 'areaName', text: '시장', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'strName', text: '상점', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'snsrNick', text: '센서', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'lCause', text: '원인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const columns2 = [
   { dataField: 'rowNo', text: 'No.', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right', height: '42px', width: '5rem' }
    , formatter: numCommaFormat }
  , { dataField: 'areaName', text: '시장', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'strName', text: '상점', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
  , { dataField: 'regDate', text: '등록일', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];


const SimulMgr = () => {
  const [simulType, setSimulType] = useState('simul1');
  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 }); // 페이징 hook
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const simulRadioHtml = (className, id, value, txt) =>
    <span className={className}>
      <input type={"radio"} id={id} value={value} checked={simulType === id} onChange={e => setSimulType(e.target.id)} />
      <label className={'ml-1'} style={{ fontSize: '15px' }} htmlFor={id}>{txt}</label>
    </span>;

  useEffect(() => {
    handleInitListSimulArea();
    handleInitTable();
  }, []);

  useEffect(() => {
    changeSimulType();
    handleInitTable();
  }, [simulType]);

  useEffect(() => handleInitTable(), [selectedAreaCode, selectedDate]);

  const handleInitListSimulArea = () => {
    getSimulAreaList().then(resp => {
      if (resp.data['result']) {
        let html = '';

        for (let item of resp.data['resultList'])
          html += `<option value="${item['areaCode']}">${item['areaName']}</option>`;

        document.getElementById("simulAreaCode").innerHTML += html;
      }
    });
  };

  const handleInitTable = () =>
    getSimulList(simulType, pageItem['page'], pageItem['sizePerPage'], selectedAreaCode, selectedDate).then(resp => {

    });

  const changeSimulType = () => {
    var labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++)
      if (labels[i].htmlFor === simulType)
        document.getElementById('simulTitle').innerText = labels[i].innerText;
  };

  return (
    <CCard>
      <CCardHeader className={'d-flex justify-content-between'}>
        <h5 id="simulTitle" className={"mb-0 ml-0"}></h5>
        <span>
          <CSelect id={'simulAreaCode'} onChange={setSelectedAreaCode}>
            <option value={''}>시장 전체</option>
          </CSelect>
        </span>
        <span>
          {simulRadioHtml('', 'simul1', '1', '실시간 센서로그 시뮬레이션')}
          <DatePicker className="ml-3" id="simulDatetime" locale={ko} selected={selectedDate} dateFormat="yyyy-MM-dd" onChange={setSelectedDate} />
          {simulRadioHtml('ml-3', 'simul2', '2', '상점별 주별보고 시뮬레이션')}
        </span>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md={'7'}>

          </CCol>
          <CCol md={'5'}>

          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default SimulMgr;
