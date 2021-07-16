import React, {Component, useEffect, useState} from 'react'
import {getAreaList, rowEvents} from "../../agent/area";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import PageTableWidget from "../../widget/pageTableWidget";
import AreaActionModal from "./areaActionModal";

// Y/N 표시 스타일
const useYnStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "N") ? 'danger' : 'primary'}>{(cell === "N") ? '미사용' : '사용'}</CBadge>
  </h5>;

const delYnStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "Y") ? 'danger' : 'primary'}>{(cell === "N") ? '미삭제' : '삭제'}</CBadge>
  </h5>;

const columns = [
  { dataField: 'areaOrder', text: '출력순서', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style : { width: '5rem'} },
  { dataField: 'areaName', text: '구역명', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'},  },
  { dataField: 'areaCode', text: '구역코드', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
  { dataField: 'storeCnt', text: '소속상점수', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center', fontWeight: '900'}},
  { dataField: 'areaManager', text: '구역관리자', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, },
  { dataField: 'areaTel', text: '전화번호', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, },
  { dataField: 'useYn', text: '사용유무', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'},  style: {textAlign: 'center'}, formatter: useYnStyleFormatter },
  { dataField: 'delYn', text: '삭제유무', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'},  style: {textAlign: 'center'}, formatter: delYnStyleFormatter },
  { dataField: 'regDate', text: '등록일자', headerStyle: {textAlign: 'center', backgroundColor: '#111827', color : '#fff'}, style: {textAlign: 'center'}},
];

const AreaMgr = () => {
  const [repo, setRepo] = useState([]);               // 리스트 state
  const [pageItem, setPageItem] = useState({});       // 페이징 state
  const [info, setInfo] = useState(false)             // Modal state

  useEffect(() => {
    handleInitTable()
  }, []);

  // 초기 테이블 셋팅
  const handleInitTable = (page = 1, sizePerPage = 10) => {
    getAreaList(page, sizePerPage).then(function (resp) {
      setRepo(resp.data["resultList"]);
      setPageItem({page: page, sizePerPage: sizePerPage, totalElementsCount: resp.data["totalElements"]})
    });
  }

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    let page = param.page;
    let sizePerPage = param.sizePerPage;

    handleInitTable(page, sizePerPage);
  };

  // 등록 버튼 이벤트
  const handleClickRegisterModal = () => {
    setInfo(true);
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol md="12" xl="12">
                <h5 className={"mb-0 ml-0 float-left"}>전체 시장 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CRow className={"mb-3"}>
                <CCol md="12" xl="12">
                  <button className={"btn btn-custom float-right mt-0"} onClick={handleClickRegisterModal}>등록</button>
                </CCol>
              </CRow>
              <PageTableWidget
                keyField={"areaCode"}
                data={repo}
                page={pageItem.page}
                sizePerPage={pageItem.sizePerPage}
                totalSize={pageItem.totalElementsCount}
                onTableChange={handleTableChange}
                viewColumns={columns}
                rowEvents={rowEvents}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AreaActionModal info={info} setInfo={setInfo}/>
    </>
  )
}

export default AreaMgr
