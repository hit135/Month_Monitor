import React, { lazy, useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButtonGroup, CButton, CInput, CSelect, CSwitch, Form } from '@coreui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";
import PageTableWidget from "../../widget/pageTableWidget";
import { getPushList } from "../../agent/push";
import { numCommaFormat, formatDate } from "../../agent/commonIndex";

const columns1 = [
    { dataField: 'pushSeq', text: 'PUSH SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'snsrSeq', text: 'SNSR SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' } }
  , { dataField: 'toInfo', text: '수신인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'fromInfo', text: '발신인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushRslt', text: '발송결과', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushStime', text: '발송일시', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'pushMsg', text: '발송내용', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const columns2 = [
    { dataField: 'smsSeq', text: 'SMS SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'right' }, formatter: numCommaFormat }
  , { dataField: 'snsrSeq', text: 'SNSR SEQ', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' } }
  , { dataField: 'smsRcv', text: '수신인', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'smsLevel', text: 'LEVEL', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'smsRslt', text: '발송결과', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'smsStime', text: '발송일시', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'center' } }
  , { dataField: 'smsMsg', text: '발송내용', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color: '#fff' }, style: { textAlign: 'left' } }
];

const PushMgr = () => {
  const [startDate, setStartDate] = useState(new Date('2018-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const [pageItem, setPageItem] = useState({ page: 1, sizePerPage: 10 });       // 페이징 state
  const [searchItem, setSearchItem] = useState({ searchWrd: "" });
  const [type, setType] = useState('push');
  const [isSuccess, setIsSuccess] = useState('all');

  const [repo, setRepo] = useState([]);               // 리스트 state

  useEffect(() => handleInitTable(), []);
  useEffect(() => handleTableChange('pageNation', { page: 1, sizePerPage: pageItem.sizePerPage }), [isSuccess]);
  useEffect(() => handleTableChange('pageNation', { page: 1, sizePerPage: pageItem.sizePerPage }), [startDate]);
  useEffect(() => handleTableChange('pageNation', { page: 1, sizePerPage: pageItem.sizePerPage }), [endDate]);

  // 초기 테이블 셋팅
  const handleInitTable = () => {
    getPushList(type, pageItem.page, pageItem.sizePerPage, formatDate(startDate), formatDate(endDate), searchItem['searchWrd'], isSuccess).then(resp => {
      if (resp.data['result']) {
        setRepo(resp.data["resultList"]);
        setPageItem({page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"]});
      }
    });
  }

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
            <span>발송구분</span>
            <span className={'ml-3'}>
              <input type="radio" checked={type === 'push'} id="typePush" value="push" readOnly={true} onClick={() => setType('push')} />
              <label className={'ml-1'} htmlFor={'typePush'}>{'PUSH'}</label>
            </span>
             <span className={'ml-2'}>
              <input type="radio" checked={type === 'sms'} id="typeSms" value="sms" readOnly={true} onClick={() => setType('sms')} />
              <label className={'ml-1'} htmlFor={'typeSms'}>{'SMS'}</label>
            </span>
          </span>
          <span>
            <span>발송여부</span>
            <span className={'ml-3'}>
              <input type="radio" checked={isSuccess === 'all'} id="radioAll" value="all" readOnly={true} onClick={() => setIsSuccess('all')} />
              <label className={'ml-1'} htmlFor={'radioAll'}>{'전체'}</label>
            </span>
            <span className={'ml-2'}>
              <input type="radio" checked={isSuccess === 'y'} id="radioY" value="y" readOnly={true} onClick={() => setIsSuccess('y')} />
              <label className={'ml-1'} htmlFor={'radioY'}>{'발송'}</label>
            </span>
            <span className={'ml-2'}>
              <input type="radio" checked={isSuccess === 'n'} id="radioN" value="n" readOnly={true} onClick={() => setIsSuccess('n')} />
              <label className={'ml-1'} htmlFor={'radioN'}>{'미발송'}</label>
            </span>
          </span>
          <span className={'d-flex'}>
            <DatePicker locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)} />
            <span className={'ml-1'}>~</span>
            <DatePicker className={'ml-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)} />
          </span>
        </div>
      </CCardHeader>
      <CCardBody>
        <PageTableWidget keyField={(type === 'push') ? "pushSeq" : "smsSeq"} data={repo} page={pageItem.page}
                         sizePerPage={pageItem.sizePerPage} totalSize={pageItem.totalElementsCount}
                         onTableChange={handleTableChange} viewColumns={(type === 'push') ? columns1 : columns2} />
      </CCardBody>
    </CCard>
  );
};

export default PushMgr;
