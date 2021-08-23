import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButtonGroup, CButton, CInput, CSelect } from '@coreui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";
import PageTableWidget from "../../widget/pageTableWidget";
import { getPushList } from "../../agent/push";
import { numCommaFormat, getInputValue } from "../../agent/commonIndex";

const pushSelectSpan = (className, id, value, checked, text) =>
  <span className={className}>
    <input type={"radio"} name={"pushSelect"} id={id} value={value} readOnly checked={checked} />
    <label className={'ml-1'} htmlFor={id}>{text}</label>
  </span>

const columns = [
    { dataField: 'pushSeq', text: 'PUSH SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'snsrSeq', text: 'SNSR SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' } }
  , { dataField: 'toInfo', text: '수신인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'fromInfo', text: '발신인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushRslt', text: '발송결과', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushStime', text: '발송일시', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushMsg', text: '발송내용', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const PushMgr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [appSwitch, setAppSwitch] = useState({ all: true, pushY: true, pushN: true });

  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 });       // 페이징 state
  const [searchItem, setSearchItem] = useState({ type: "push", searchWrd: "" });

  const [repo, setRepo] = useState([]);               // 리스트 state

  useEffect(() => handleInitTable(), []);

  // 초기 테이블 셋팅
  const handleInitTable = () =>
    getPushList(searchItem["type"], pageItem.page, pageItem.sizePerPage, searchItem['searchWrd']).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({ page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"] });
      }
    });

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;
    handleInitTable();
  };

  return (
    <CCard>
      <CCardHeader>
        <div className={'d-flex justify-content-between'}>
          <h5 className={"mb-0 ml-0"}>발송 이력 목록</h5>
          <span>
            {pushSelectSpan('', 'push1', '1', true, '전체')}
            {pushSelectSpan('ml-2', 'push2', '2', false, '발송')}
            {pushSelectSpan('ml-2', 'push3', '3', false, '미발송')}
            </span>
          <span className={'d-flex'}>
            <DatePicker locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)} />
            <span className={'ml-1'}>~</span>
            <DatePicker className={'ml-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)} />
          </span>
        </div>
      </CCardHeader>
      <CCardBody>
        <PageTableWidget keyField={"pushSeq"} data={repo} page={pageItem.page} sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                         onTableChange={handleTableChange} viewColumns={columns} />
      </CCardBody>
    </CCard>
  );
};

export default PushMgr;
