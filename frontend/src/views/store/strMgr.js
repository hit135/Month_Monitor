import React, {lazy, useEffect, useState} from 'react'
import PageTableWidget from "../../widget/pageTableWidget";
import {CBadge, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow, CSwitch} from "@coreui/react";
import {getStrList} from "../../agent/store";
import StrActionModal from "./strActionModal";

export const numCommaFormat = value => (Math.abs(parseInt(value)) >= 1000) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : value;

// Y/N 표시 스타일
const ynStyleFormatter = (cell) =>
  <h5 className="mr-0 mb-0">
    <CBadge color={(cell === "N") ? 'danger' : 'primary'}>{(cell === "N") ? '미사용' : '사용'}</CBadge>
  </h5>;

const columns = [
  { dataField: 'rowNum', text: '번호', headerStyle: { textAlign: 'center', height: '42px', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'right', height: '42px', width: '5rem' }, formatter: (cell) => numCommaFormat(cell) },
  { dataField: 'areaName', text: '구역명', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, },
  { dataField: 'strName', text: '상점명', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' },  },
  { dataField: 'strOwnName', text: '상점주', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' },  },
  { dataField: 'strAddr', text: '주소', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' },  },
  { dataField: 'strTel', text: '상점 전화번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, },
  { dataField: 'strOwnTel', text: '상점주 전화번호', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, },
  { dataField: 'useYn', text: '사용유무', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, formatter: ynStyleFormatter },
  { dataField: 'regDate', text: '등록일', headerStyle: { textAlign: 'center', backgroundColor: '#111827', color : '#fff' }, style: {  textAlign: 'center' }, }
];
const StrMgr = (props) => {
  const [repo, setRepo] = useState([]);               // 리스트 hook
  const [pageItem, setPageItem] = useState({
    page : 1,
    sizePerPage: 10
  }); // 페이징 hook
  const [searchItem, setSearchItem] = useState({
    searchWrd : "",
    useYn : "Y",
  });

  const [actionModal, setActionModal] = useState(false)             // Modal hook
  const [modifyModal, setModifyModal] = useState(false)             // Modal hook

  // 초기 테이블 셋팅
  const handleInitTable = () => {
    getStrList(pageItem.page, pageItem.sizePerPage, searchItem).then(function (resp) {
      setRepo(resp.data["resultList"]);
      setPageItem({page: pageItem.page, sizePerPage: pageItem.sizePerPage, totalElementsCount: resp.data["totalElements"]})
    });
  }

  useEffect(() => {
    handleInitTable();
  }, []);

  // 페이징 클릭 시
  const handleTableChange = (pageNation, param) => {
    pageItem.page = param.page;
    pageItem.sizePerPage = param.sizePerPage;

    handleInitTable();
  };

  // 검색 버튼 이벤트
  const handleClickSearchBtn = () => {
    pageItem.page = 1;
    handleInitTable();
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol className={"pl-0"} md="12" xl="12">
                <h5 className={"mb-0 ml-0 float-left"}>전체 상점 목록</h5>
              </CCol>
            </CCardHeader>
            <CCardBody className={"pt-3"}>
              <CRow className={"mb-3"}>
                <CCol md="12" xl="12">
                  <CCol sm="2" className={"float-left pl-0"}>
                    <CInput placeholder="검색어 입력" onKeyUp={(e) => {
                      searchItem.searchWrd = e.target.value;
                      if(e.key === "Enter") handleClickSearchBtn()
                    }} />
                  </CCol>
                  <button className={"btn btn-custom-info mt-0"} onClick={handleClickSearchBtn}>검색</button>

                  <CFormGroup className="pr-3 d-inline-flex mb-0 ct-mt pl-3">
                    <CLabel htmlFor="useYn" className="pr-1">사용유무</CLabel>
                    <CSwitch className={'mx-1'} color={'info'} labelOn={'사용'} labelOff={'미사용'} id={"useYn"}  defaultChecked/>
                  </CFormGroup>
                  <CFormGroup className="pr-3 d-inline-flex mb-0 ct-mt">
                    <CLabel htmlFor="exampleInputName2" className="pr-1">삭제유무</CLabel>
                    <CSwitch className={'mx-1'} color={'danger'} labelOn={'삭제'} labelOff={'미삭제'}  id={"delYn"} />
                  </CFormGroup>

                  <button className={"btn btn-custom float-right mt-0"} onClick={(e) => {
                    setActionModal(true);
                  }}>등록</button>
                </CCol>
              </CRow>
              <PageTableWidget
                keyField={"strCode"}
                data={repo}
                page={pageItem.page}
                sizePerPage={pageItem.sizePerPage}
                totalSize={pageItem.totalElementsCount}
                onTableChange={handleTableChange}
                viewColumns={columns}
                // rowEvents={rowEvents}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <StrActionModal modal={actionModal} setModal={setActionModal} handleInitTable={handleInitTable} />
    </>
  )
}

export default StrMgr
