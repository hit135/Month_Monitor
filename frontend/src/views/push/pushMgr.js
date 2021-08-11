import React, { lazy, useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButtonGroup, CButton, CInput, CSelect } from '@coreui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { ko } from "date-fns/esm/locale";
import PageTableWidget from "../../widget/pageTableWidget";
import { getAreaList, rowEvents } from "../../agent/area";

const columns = [
  { dataField: 'rowNo', text: '순번', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'right'}},
  { dataField: 'snsrId', text: '센서아이디', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}},
  { dataField: 'pushType', text: '전송형태', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
  { dataField: 'toInfo', text: '수신인', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
  { dataField: 'toPhone', text: '수신인 전화번호', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
  { dataField: 'pushRslt', text: '발송결과', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'},  style: {textAlign: 'center'}},
  { dataField: 'pushTime', text: '발송일시', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'},  style: {textAlign: 'center'}},
  { dataField: 'pusMsg', text: '발송내용', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
];

const PushMgr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [repo, setRepo] = useState([]);               // 리스트 state
  const [pageItem, setPageItem] = useState({});       // 페이징 state

  useEffect(() => {
    handleInitTable()
  }, []);

  // 초기 테이블 셋팅
  const handleInitTable = (page = 1, sizePerPage = 10) => {
    var item = [
        { 'rowNo': '1', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '2', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '3', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '4', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '5', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '6', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '7', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '8', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '9', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
      , { 'rowNo': '10', 'snsrId': '000000001111', 'pushType': '경고', 'toInfo': 'insp01', 'toPhone': '010-11111-2222', 'pushRslt': '성공', 'pushTime': '2021-01-11 11:22:33', 'pusMsg': '과전류 2차 경보' }
    ];

    setRepo(item);
    setPageItem({page: page, sizePerPage: sizePerPage, totalElementsCount: 22});

    /*
    getAreaList(page, sizePerPage).then(function (resp) {
      setRepo(resp.data["resultList"]);
      setPageItem({page: page, sizePerPage: sizePerPage, totalElementsCount: resp.data["totalElements"]})
    });
    */
  };

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    let page = param.page;
    let sizePerPage = param.sizePerPage;

    handleInitTable(page, sizePerPage);
  };

  return (
    <div>
      <CCard>
        <CCardHeader>
          <div className={'d-flex justify-content-between'}>
            <h5 className={"mb-0 ml-0"}>발송 이력 목록</h5>
            <CButtonGroup>
              <CButton color={'info'}>전체</CButton>
              <CButton color={'info'}>발송</CButton>
              <CButton color={'info'}>미발송</CButton>
            </CButtonGroup>
            <span className={'d-flex'}>
              <DatePicker locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)}/>
              <span className={'ml-1'}>~</span>
              <DatePicker className={'ml-1'} locale={ko} selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)}/>
              <CInput className={'ml-3'} type={'text'} />
            </span>
                <span>
              <CButton color={'success'}>검색</CButton>
              <CButton className={'ml-1'} color={'info'}>엑셀 저장</CButton>
            </span>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className={'mt-3'}>
            <PageTableWidget
              keyField={"rowNo"}
              data={repo}
              page={pageItem.page}
              sizePerPage={pageItem.sizePerPage}
              totalSize={pageItem.totalElementsCount}
              onTableChange={handleTableChange}
              viewColumns={columns}
              rowEvents={rowEvents} />
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default PushMgr;
